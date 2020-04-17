'use strict'

const BaseDao = require('./BaseDao')

class AuthDao extends BaseDao {
  authenticate (email, googleId) {
    return this.query({
      sql: `SELECT *
            FROM users
            WHERE email = $1
            OR google_id = $2`,
      params: [email, googleId]
    })
  }
}

module.exports = new AuthDao()
