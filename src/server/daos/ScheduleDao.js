'use strict'

const BaseDao = require('./BaseDao')
const GroupClassTime = require('../../shared/models/GroupClassTime')
const logger = require('../Logger')
const pgFormat = require('pg-format')
const Schedule = require('../../shared/models/Schedule')
const Student = require('../../shared/models/Student')

class ScheduleDao extends BaseDao {
  deleteGroupClass (id) {
    return this.query({
      sql: `DELETE FROM group_classes
            WHERE id = $1`,
      params: [id]
    })
  }

  deleteGroupClassTime (id) {
    return this.query({
      sql: `DELETE FROM group_class_times
            WHERE id = $1`,
      params: [id]
    })
  }

  async insertGroupClass ({ month, date, year }) {
    const result = await this.query({
      sql: `INSERT INTO group_classes (month, date, year)
            VALUES ($1, $2, $3)
            RETURNING id`,
      params: [month, date, year]
    })

    return { id: result.rows[0].id }
  }

  async insertGroupClassTime ({ hour, minutes, meridiem, duration, studentIds }) {
    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      const result = await poolClient.query(
        `INSERT INTO group_class_times (hour, minutes, meridiem, duration)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [hour, minutes, meridiem, duration]
      )

      const id = result.rows[0].id

      await poolClient.query(pgFormat(
        `INSERT INTO group_class_students (student_id, group_class_time_id)
         VALUES %L`,
        studentIds.map(studentId => [studentId, id]) // Create an array of arrays for %L.
      ))

      await poolClient.query('COMMIT')

      return { id }
    } catch (err) {
      logger.error('Error inserting group class time')
      logger.error(err)
      if (poolClient) await poolClient.query('ROLLBACK')
    } finally {
      if (poolClient) poolClient.release()
    }
  }

  async selectSchedule () {
    const schedule = new Schedule()

    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      // Effective Date

      let result = await poolClient.query(
        `SELECT month, date, year
         FROM effective_date`,
        []
      )

      schedule.date = result.rows[0].date
      schedule.month = result.rows[0].month
      schedule.year = result.rows[0].year

      // Students

      result = await poolClient.query(
        `SELECT s.id, s.name, s.lesson_day, s.lesson_hour, s.lesson_minutes, s.lesson_meridiem, s.lesson_duration,
                sp.parent_id
         FROM students AS s
         JOIN student_parents AS sp
         ON sp.student_id = s.id`,
        []
      )

      const studentParentMap = new Map()

      for (const row of result.rows) {
        const student = studentParentMap.get(row.id) || new Student()

        if (!student.id) {
          student.id = row.id
          student.name = row.name
          student.lessonDay = row.lessonDay
          student.lessonHour = row.lessonHour
          student.lessonMinutes = row.lessonMinutes
          student.lessonMeridiem = row.lessonMeridiem
          student.lessonDuration = row.lessonDuration
          studentParentMap.set(student.id, student)
        }

        student.parentIds.push(row.parentId)
      }

      schedule.students = Array.from(studentParentMap.values())

      // Parents

      result = await poolClient.query(
        `SELECT id, name, phone
         FROM parents`,
        []
      )

      schedule.parents = result.rows

      // Users

      result = await poolClient.query(
        `SELECT u.id, u.email, pu.parent_id
         FROM users AS u
         JOIN parent_users AS pu
         ON pu.user_id = u.id`,
        []
      )

      schedule.users = result.rows

      // Group classes

      const today = new Date() // TODO: Will this be Mountain time in AWS?

      result = await poolClient.query(
        `SELECT *
         FROM group_classes
         WHERE year >= $1`,
        [today.getFullYear()]
      )

      const groupClasses = []

      for (const row of result.rows) {
        if (row.year > today.getFullYear()) {
          groupClasses.push(row)
        } else if (row.year === today.getFullYear()) {
          if (row.month > today.getMonth()) {
            groupClasses.push(row)
          } else if (row.month === today.getMonth()) {
            if (row.date >= today.getDate()) {
              groupClasses.push(row)
            }
          }
        }
      }

      schedule.groupClasses = groupClasses

      // Group class times

      result = await poolClient.query(
        `SELECT t.id, t.hour, t.minutes, t.meridiem, t.duration, s.student_id
         FROM group_class_times AS t
         JOIN group_class_students AS s
         ON s.group_class_time_id = t.id`,
        []
      )

      await poolClient.query('COMMIT')

      const groupClassTimeMap = new Map()

      for (const row of result.rows) {
        const groupClassTimeId = row.id
        if (groupClassTimeMap.has(groupClassTimeId)) {
          groupClassTimeMap.get(groupClassTimeId).studentIds.push(row.studentId)
        } else {
          const groupClassTime = new GroupClassTime()
          groupClassTime.duration = row.duration
          groupClassTime.hour = row.hour
          groupClassTime.id = groupClassTimeId
          groupClassTime.meridiem = row.meridiem
          groupClassTime.minutes = row.minutes
          groupClassTime.studentIds.push(row.studentId)
          groupClassTimeMap.set(groupClassTimeId, groupClassTime)
        }
      }

      for (const groupClassTime of groupClassTimeMap.values()) {
        schedule.groupClassTimes.push(groupClassTime)
      }

      return schedule
    } catch (err) {
      logger.error('Error getting schedule')
      logger.error(err)
      if (poolClient) await poolClient.query('ROLLBACK')
    } finally {
      if (poolClient) poolClient.release()
    }
  }

  updateEffectiveDate (month, date, year) {
    return this.query({
      sql: `UPDATE effective_date
            SET month = $1, date = $2, year = $3`,
      params: [month, date, year]
    })
  }

  updateGroupClass (id, month, date, year) {
    return this.query({
      sql: `UPDATE group_classes
            SET month = $1, date = $2, year = $3
            WHERE id = $4`,
      params: [month, date, year, id]
    })
  }

  async updateGroupClassTime (groupClassTime) {
    const {
      duration,
      hour,
      id,
      meridiem,
      minutes,
      studentIds
    } = groupClassTime

    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      await poolClient.query(
        `DELETE FROM group_class_students
         WHERE group_class_time_id = $1`,
        [id]
      )

      await poolClient.query(
        `UPDATE group_class_times
         SET hour = $1, minutes = $2, meridiem = $3, duration = $4
         WHERE id = $5`,
        [hour, minutes, meridiem, duration, id]
      )

      await poolClient.query(pgFormat(
        `INSERT INTO group_class_students (student_id, group_class_time_id)
         VALUES %L`,
        studentIds.map(studentId => [studentId, id]) // Create an array of arrays for %L.
      ))

      await poolClient.query('COMMIT')
    } catch (err) {
      logger.error('Error updating group class time')
      logger.error(err)
      if (poolClient) await poolClient.query('ROLLBACK')
    } finally {
      if (poolClient) poolClient.release()
    }
  }
}

module.exports = new ScheduleDao()
