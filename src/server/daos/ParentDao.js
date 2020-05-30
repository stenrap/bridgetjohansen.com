'use strict'

const BaseDao = require('./BaseDao')
const logger = require('../Logger')
const pgFormat = require('pg-format')

class ParentDao extends BaseDao {
  async insertParent (parent) {
    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      let result = await poolClient.query(
        `INSERT INTO parents (name, phone)
         VALUES ($1, $2)
         RETURNING id`,
        [parent.name, parent.phone]
      )

      const parentId = parseInt(result.rows[0].id)

      result = await poolClient.query(pgFormat(
        `INSERT INTO users (email)
         VALUES %L
         ON CONFLICT (email) DO UPDATE
         SET email = EXCLUDED.email
         RETURNING id, email`,
        parent.emails.map(email => [email.toLowerCase()]) // Convert to lowercase, and create an array of arrays for %L.
      ))

      await poolClient.query(pgFormat(
        `INSERT INTO parent_users (parent_id, user_id)
         VALUES %L`,
        result.rows.map(user => [parentId, Number(user.id)]) // Create an array of arrays for %L.
      ))

      await poolClient.query('COMMIT')

      return {
        id: parentId,
        users: result.rows
      }
    } catch (err) {
      logger.error('Error inserting parent and/or users')
      logger.error(err)
      if (poolClient) await poolClient.query('ROLLBACK')
    } finally {
      if (poolClient) poolClient.release()
    }
  }
}

module.exports = new ParentDao()
