'use strict'

const BaseDao = require('./BaseDao')
const logger = require('../Logger')
const pgFormat = require('pg-format')

class StudentDao extends BaseDao {
  async deleteStudent (id) {
    /*
      TODO and WYLO ....

        1. Update this method to support the new schema. You'll have to return something other than { success: true }
           from the resolver (e.g. { deletedParentIds: [1, 2] }) so the front end knows when to delete local parents
           and users.

        2. Update the redux store to properly delete local parents and users when appropriate. Remember that the
           response will be { deletedParentIds: [] } when a student with active siblings is deleted.
     */

    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      /*
        We look up student_users first so we can determine whether the user associated
        with the student being deleted is also associated with another student (e.g. a
        sibling). If we get a result that looks something like this...

           student_id | user_id
          ------------+---------
                    8 |      13  <-- The student being deleted and the user id of his dad
                    8 |      14  <-- The student being deleted and the user id of his mom
                   11 |      13  <-- Different student, same dad
                   11 |      14  <-- Different student, same mom

        ...then we know we can't delete users with id 13 and 14.
       */

      const result = await poolClient.query(
        `SELECT student_id, user_id
         FROM student_users
         WHERE user_id IN (
           SELECT user_id
           FROM student_users WHERE student_id = $1
         )`,
        [id]
      )

      const userIdCountMap = new Map()

      for (const studentUser of result.rows) {
        if (!userIdCountMap.has(studentUser.userId)) {
          userIdCountMap.set(studentUser.userId, 1)
        } else {
          userIdCountMap.set(studentUser.userId, userIdCountMap.get(studentUser.userId) + 1)
        }
      }

      const userIds = []

      for (const [id, count] of userIdCountMap) {
        if (count === 1) {
          userIds.push(id)
        }
      }

      if (userIds.length > 0) {
        await poolClient.query(pgFormat(
          `DELETE FROM users
           WHERE id IN (%L)`,
          userIds
        ))
      }

      await poolClient.query(
        `DELETE FROM students
         WHERE id = $1`,
        [id]
      )

      await poolClient.query('COMMIT')
    } catch (err) {
      logger.error('Error deleting student')
      logger.error(err)
      if (poolClient) await poolClient.query('ROLLBACK')
    } finally {
      if (poolClient) poolClient.release()
    }
  }

  async insertStudent (student) {
    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      const result = await poolClient.query(
        `INSERT INTO students (name, lesson_day, lesson_hour, lesson_minutes, lesson_meridiem, lesson_duration)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [student.name, student.lessonDay, student.lessonHour, student.lessonMinutes, student.lessonMeridiem, student.lessonDuration]
      )

      const studentId = parseInt(result.rows[0].id)

      await poolClient.query(pgFormat(
        `INSERT INTO student_parents (student_id, parent_id)
         VALUES %L`,
        student.parentIds.map(parentId => [studentId, parentId]) // Create an array of arrays for %L.
      ))

      await poolClient.query('COMMIT')

      return { id: studentId }
    } catch (err) {
      logger.error('Error inserting student')
      logger.error(err)
      if (poolClient) await poolClient.query('ROLLBACK')
    } finally {
      if (poolClient) poolClient.release()
    }
  }
}

module.exports = new StudentDao()
