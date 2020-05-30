'use strict'

const BaseDao = require('./BaseDao')
const GroupClassDate = require('../../shared/models/GroupClassDate')
const GroupClassTime = require('../../shared/models/GroupClassTime')
const logger = require('../Logger')
const Parent = require('../../shared/models/Parent')
const Schedule = require('../../shared/models/Schedule')
const Student = require('../../shared/models/Student')
const User = require('../../shared/models/User')

class ScheduleDao extends BaseDao {
  async selectSchedule () {
    const schedule = new Schedule()

    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      let result = await poolClient.query(
        `SELECT month, date, year
         FROM effective_date`,
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

      // TODO and WYLO .... Figure out how to update this query to retrieve the right data from the new schema:

      result = await poolClient.query(
        `SELECT s.id AS student_id, s.name AS student_name, s.lesson_day, s.lesson_hour,
                s.lesson_minutes, s.lesson_meridiem, s.lesson_duration,
                p.id AS parent_id, p.name AS parent_name, p.phone,
                u.id AS user_id, u.email
         FROM students AS s
         JOIN student_parents AS sp
         ON sp.student_id = s.id
         JOIN parents AS p
         ON sp.parent_id = p.id
         JOIN parent_users AS pu
         ON pu.parent_id = p.id
         JOIN users AS u
         ON u.id = pu.user_id`,
        []
      )

      await poolClient.query('COMMIT')

      /*
        Example results:

           studentId |  studentName  | lessonDay | lessonHour | lessonMinutes | lessonMeridiem | lessonDuration | parentId |  parentName  |    phone     | userId |          email
          -----------+---------------+-----------+------------+---------------+----------------+----------------+----------+--------------+--------------+--------+-------------------------
                   1 | Ben Andrews   |         2 |          4 |             0 |             pm |             30 |        1 | Keith & Anna | 801.755.5000 |      1 | keith.andrews@gmail.com
                   1 | Ben Andrews   |         2 |          4 |             0 |             pm |             30 |        1 | Keith & Anna | 801.755.5000 |      2 | anna.andrews@gmail.com
                   2 | Phoebe Little |         3 |          2 |            30 |             pm |             60 |        2 | Grace Jones  | 801.555.1234 |      3 | grace.jones@gmail.com
                   2 | Phoebe Little |         3 |          2 |            30 |             pm |             60 |        3 | Jim Rock     | 801.555.5678 |      4 | jim.rock@gmail.com
                   3 | Ellie Hyde    |         4 |          3 |            45 |             pm |             45 |        4 | Bob & Alice  | 801.419.5982 |      5 | alice.hyde@gmail.com
       */

      /*
        The `studentParentMap` below should look like this:

          {
            1: { // studentId
              1: { // parentId
                id: 1,
                name: 'Keith & Anna',
                phone: '801.755.5000',
                users: [
                  { id: 1, email: keith.andrews@gmail.com },
                  { id: 2, email: anna.andrews@gmail.com }
                ]
              }
            },
            2: { // studentId
              2: { // parentId
                id: 2,
                name: 'Grace Jones',
                phone: '801.555.1234',
                users: [
                  { id: 3, email: grace.jones@gmail.com }
                ]
              },
              3: { // parentId
                id: 3,
                name: 'Jim Rock',
                phone: '801.555.5678',
                users: [
                  { id: 4, email: jim.rock@gmail.com }
                ]
              }
            },
            3: { // studentId
              4: { // parentId
                id: 4,
                name: 'Bob & Alice'
                phone: '801.419.5982',
                users: [
                  { id: 5, email: 'alice.hyde@gmail.com' }
                ]
              }
            }
          }
       */

      const studentMap = new Map()
      const studentParentMap = new Map()

      for (const row of result.rows) {
        const studentId = row.studentId
        const parentId = row.parentId

        const user = new User()
        user.id = row.userId
        user.email = row.email

        const parent = new Parent()
        parent.id = parentId
        parent.name = row.parentName
        parent.phone = row.phone
        parent.users = [user]

        if (studentParentMap.has(studentId)) {
          const parentMap = studentParentMap.get(studentId)

          if (parentMap.has(parentId)) {
            parentMap.get(parentId).users.push(user)
          } else {
            parentMap.set(parentId, parent)
          }
        } else {
          const parentMap = new Map()
          parentMap.set(parentId, parent)
          studentParentMap.set(studentId, parentMap)
        }

        if (!studentMap.has(studentId)) {
          const student = new Student()
          student.id = studentId
          student.lessonDay = row.lessonDay
          student.lessonDuration = row.lessonDuration
          student.lessonHour = row.lessonHour
          student.lessonMeridiem = row.lessonMeridiem
          student.lessonMinutes = row.lessonMinutes
          student.name = row.studentName
          studentMap.set(studentId, student)
        }
      }

      for (const student of studentMap.values()) {
        const parentMap = studentParentMap.get(student.id)
        student.parents = Array.from(parentMap.values())
        schedule.students.push(student)
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
      sql: `UPDATE schedule
            SET month = $1, date = $2, year = $3`,
      params: [month, date, year]
    })
  }
}

module.exports = new ScheduleDao()
