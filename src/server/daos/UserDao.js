'use strict'

const BaseDao = require('./BaseDao')
const logger = require('../Logger')
const tokenLib = require('../../shared/libs/token')

class UserDao extends BaseDao {
  async getUser (token) {
    const result = await this.query({
      sql: `SELECT *
            FROM users
            WHERE token = $1`,
      params: [token]
    })

    return result.rows[0]
  }

  async signIn (email, googleId) {
    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      const result = await poolClient.query(
        `SELECT id, email, admin
         FROM users
         WHERE email = $1
         OR google_id = $2`,
        [email.toLowerCase(), googleId]
      )

      const user = result.rows[0]

      if (!user) throw new Error('User not found')

      const token = tokenLib.createToken()

      await poolClient.query(
        `UPDATE users
         SET email = $1, google_id = $2, token = $3
         WHERE id = $4`,
        [email.toLowerCase(), googleId, token, user.id]
      )

      await poolClient.query('COMMIT')
      return { token, user }
    } catch (err) {
      logger.error(`Error signing in ${email}`)
      logger.error(err)
      if (poolClient) await poolClient.query('ROLLBACK')
      throw err
    } finally {
      if (poolClient) poolClient.release()
    }
  }

  signOut (id) {
    return this.query({
      sql: `UPDATE users
            SET token = NULL
            WHERE id = $1`,
      params: [id]
    })
  }
}

module.exports = new UserDao()
