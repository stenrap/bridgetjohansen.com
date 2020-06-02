'use strict'

const BaseDao = require('./BaseDao')
const logger = require('../Logger')
const pgFormat = require('pg-format')

class StudentDao extends BaseDao {
  async deleteStudent (id) {
    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      /*
        We look up student_parents first so we can determine whether the parent(s)
        associated with the student being deleted is(are) also associated with
        other students (i.e. siblings). If the result looks something like this...

           student_id | parent_id
          ------------+-----------
                    8 |        13  <-- The student being deleted and the parent id of her dad
                    8 |        14  <-- The student being deleted and the parent id of her mom
                   11 |        13  <-- Different student, same dad
                   11 |        14  <-- Different student, same mom

        ...then we know we can't delete parents with id 13 and 14.
       */

      const result = await poolClient.query(
        `SELECT student_id, parent_id
         FROM student_parents
         WHERE parent_id IN (
           SELECT parent_id
           FROM student_parents WHERE student_id = $1
         )`,
        [id]
      )

      const parentIdCountMap = new Map()

      for (const studentParent of result.rows) {
        if (!parentIdCountMap.has(studentParent.parentId)) {
          parentIdCountMap.set(studentParent.parentId, 1)
        } else {
          parentIdCountMap.set(studentParent.parentId, parentIdCountMap.get(studentParent.parentId) + 1)
        }
      }

      const parentIds = []

      for (const [id, count] of parentIdCountMap) {
        if (count === 1) {
          parentIds.push(id)
        }
      }

      if (parentIds.length > 0) {
        await poolClient.query(pgFormat(
          `DELETE FROM users
           WHERE id IN (
             SELECT user_id
             FROM parent_users
             WHERE parent_id IN (%L)
           )`,
          parentIds
        ))

        await poolClient.query(pgFormat(
          `DELETE FROM parents
           WHERE id IN (%L)`,
          parentIds
        ))
      }

      await poolClient.query(
        `DELETE FROM students
         WHERE id = $1`,
        [id]
      )

      await poolClient.query('COMMIT')

      return { deletedParentIds: parentIds }
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
