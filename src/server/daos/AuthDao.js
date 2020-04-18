'use strict'

const BaseDao = require('./BaseDao')

class AuthDao extends BaseDao {
  authenticate (email, googleId) {
    /*
      TODO: This actually needs to be a transaction. You must:
        0. Look up the user
        1. Update the user's email (they may have changed it with Google).
        2. Give the user a new token.
     */
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
