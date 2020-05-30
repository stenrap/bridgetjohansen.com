'use strict'

const BaseDao = require('./BaseDao')
const GroupClassTime = require('../../shared/models/GroupClassTime')
const logger = require('../Logger')
const Schedule = require('../../shared/models/Schedule')

class ScheduleDao extends BaseDao {
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
        `SELECT *
         FROM students`,
        []
      )

      schedule.students = result.rows

      // Parents

      result = await poolClient.query(
        `SELECT p.id, p.name, p.phone, sp.student_id
         FROM parents AS p
         JOIN student_parents AS sp
         ON sp.parent_id = p.id`,
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

      // Group class dates

      const today = new Date() // TODO: Will this be Mountain time in AWS?

      result = await poolClient.query(
        `SELECT *
         FROM group_class_dates
         WHERE month >= $1
         AND date >= $2
         AND year >= $3`,
        [today.getMonth(), today.getDate(), today.getFullYear()]
      )

      schedule.groupClassDates = result.rows

      // Group class times

      // TODO: The below logic results in an array of group class time objects that each have an array of student ids.
      //       Is this too complicated a data structure for the redux store? Should you just return an array of group
      //       class time objects that each has a studentId property? (You're not sure, but think about it when you get
      //       around to CRUDing group class times.

      result = await poolClient.query(
        `SELECT t.id, t.hour, t.minutes, s.student_id
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
