'use strict'

const BaseDao = require('./BaseDao')
const logger = require('../Logger')
const pgFormat = require('pg-format')

class StudentDao extends BaseDao {
  async insertStudent (student) {
    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      let result = await poolClient.query(
        `INSERT INTO students (name, parents, phone, lesson_day, lesson_hour, lesson_minutes, lesson_meridiem, lesson_duration)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [student.name, student.parents, student.phone, student.lessonDay, student.lessonHour, student.lessonMinutes, student.lessonMeridiem, student.lessonDuration]
      )

      const studentId = parseInt(result.rows[0].id)

      const emails = []

      for (const email of student.emails) {
        emails.push([email])
      }

      result = await poolClient.query(pgFormat(
        `INSERT INTO users (email)
         VALUES %L
         RETURNING id, email`,
        emails
      ))

      const studentUsers = []

      for (const user of result.rows) {
        studentUsers.push([studentId, parseInt(user.id, 10)])
      }

      await poolClient.query(pgFormat(
        `INSERT INTO student_users (student_id, user_id)
         VALUES %L`,
        studentUsers
      ))

      await poolClient.query('COMMIT')

      return {
        id: studentId,
        users: result.rows
      }
    } catch (err) {
      logger.error('Error inserting student')
      logger.error(err)
      await poolClient.query('ROLLBACK')
    } finally {
      if (poolClient) poolClient.release()
    }
  }
}

module.exports = new StudentDao()
