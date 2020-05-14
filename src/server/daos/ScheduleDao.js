'use strict'

const BaseDao = require('./BaseDao')
const GroupClassDate = require('../../shared/models/GroupClassDate')
const GroupClassTime = require('../../shared/models/GroupClassTime')
const logger = require('../Logger')
const Schedule = require('../../shared/models/Schedule')
const Student = require('../../shared/models/Student')
const StudentUser = require('../../shared/models/StudentUser')

class ScheduleDao extends BaseDao {
  async selectSchedule () {
    const schedule = new Schedule()

    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      let result = await poolClient.query(
        `SELECT month, date, year
         FROM schedule`,
        []
      )

      schedule.date = result.rows[0].date
      schedule.month = result.rows[0].month
      schedule.year = result.rows[0].year

      const today = new Date()

      result = await poolClient.query(
        `SELECT *
         FROM group_class_dates
         WHERE month >= $1
         AND date >= $2
         AND year >= $3`,
        [today.getMonth(), today.getDate(), today.getFullYear()]
      )

      for (const row of result.rows) {
        const groupClassDate = new GroupClassDate()
        groupClassDate.date = row.date
        groupClassDate.id = row.id
        groupClassDate.month = row.month
        groupClassDate.year = row.year
        schedule.groupClassDates.push(groupClassDate)
      }

      result = await poolClient.query(
        `SELECT t.id, t.hour, t.minutes, s.student_id
         FROM group_class_times AS t
         JOIN group_class_students AS s
         ON s.group_class_time_id = t.id`,
        []
      )

      const groupClassTimeMap = new Map()

      for (const row of result.rows) {
        const groupClassTimeId = row.id
        if (groupClassTimeMap.has(groupClassTimeId)) {
          groupClassTimeMap.get(groupClassTimeId).studentIds.push(row.studentId)
        } else {
          const groupClassTime = new GroupClassTime()
          groupClassTime.hour = row.hour
          groupClassTime.id = groupClassTimeId
          groupClassTime.minutes = row.minutes
          groupClassTime.studentIds.push(row.studentId)
          groupClassTimeMap.set(groupClassTimeId, groupClassTime)
        }
      }

      for (const groupClassTime of groupClassTimeMap.values()) {
        schedule.groupClassTimes.push(groupClassTime)
      }

      result = await poolClient.query(
        `SELECT s.id AS student_id, s.name, s.parents, s.phone, s.lesson_day, s.lesson_hour, s.lesson_minutes, s.lesson_duration,
                u.id AS user_id, u.email
         FROM students AS s
         JOIN student_users AS su
         ON su.student_id = s.id
         JOIN users AS u
         ON u.id = su.user_id`,
        []
      )

      await poolClient.query('COMMIT')

      const studentUserMap = new Map()

      for (const row of result.rows) {
        const studentId = row.studentId

        const user = new StudentUser()
        user.id = row.userId
        user.email = row.email

        if (studentUserMap.has(studentId)) {
          studentUserMap.get(studentId).users.push(user)
        } else {
          const student = new Student()
          student.id = studentId
          student.lessonDay = row.lessonDay
          student.lessonDuration = row.lessonDuration
          student.lessonHour = row.lessonHour
          student.lessonMinutes = row.lessonMinutes
          student.name = row.name
          student.parents = row.parents
          student.phone = row.phone
          student.users.push(user)
          studentUserMap.set(studentId, student)
        }
      }

      for (const student of studentUserMap.values()) {
        schedule.students.push(student)
      }

      return schedule
    } catch (err) {
      logger.error('Error getting schedule')
      logger.error(err)
    } finally {
      if (poolClient) poolClient.release()
    }
  }

  updateEffectiveDate (month, date, year) {
    return this.query({
      sql: `UPDATE schedule
            SET month = $1, date = $2, year = $3`,
      params: [month, date, year]
    })
  }
}

module.exports = new ScheduleDao()
