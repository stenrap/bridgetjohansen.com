'use strict'

const BaseDao = require('./BaseDao')
const tokenLib = require('../../shared/libs/token')

class AuthDao extends BaseDao {
  async authenticate (email, googleId) {
    let poolClient = null

    try {
      poolClient = await this.getPoolClient()
      await poolClient.query('BEGIN')

      const result = await poolClient.query(
        `SELECT id, email, admin
         FROM users
         WHERE email = $1
         OR google_id = $2`,
        [email, googleId]
      )

      const user = result.rows[0]

      if (!user) throw new Error('User not found')

      const token = tokenLib.createToken()

      await poolClient.query(
        `UPDATE users
         SET email = $1, google_id = $2, token = $3
         WHERE id = $4`,
        [email, googleId, token, user.id]
      )

      await poolClient.query('COMMIT')
      return { token, user }
    } catch (err) {
      console.log(`Error authenticating ${email}`)
      console.log(err)
      throw err
    } finally {
      if (poolClient) poolClient.release()
    }
  }
}

module.exports = new AuthDao()
