'use strict'

const pg = require('pg')
const pgCamelCase = require('pg-camelcase')

const logger = require('../Logger')

// Convert field names of query results to camel case. See this if you
// ever need to revert: https://github.com/hoegaarden/pg-camelcase
pgCamelCase.inject(pg)

const pool = new pg.Pool({
  database: process.env.PIANO_DB_NAME,
  host: process.env.PIANO_DB_HOST,
  idleTimeoutMillis: 60000, // How long a client must be idle in the pool before it is disconnected.
  password: process.env.PIANO_DB_PASSWORD,
  port: 5432,
  user: process.env.PIANO_DB_USER
})

pool.on('error', err => {
  logger.error('Database pool error')
  logger.error(err.message)
})

class BaseDao {
  query (props) {
    const { sql, params } = props
    return pool.query(sql, params).then(result => result)
  }

  getPoolClient () {
    return pool.connect()
  }
}

module.exports = BaseDao
