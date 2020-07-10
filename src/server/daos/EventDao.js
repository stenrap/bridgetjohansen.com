'use strict'

const BaseDao = require('./BaseDao')

class EventDao extends BaseDao {
  async insertEvent (event) {
    const result = await this.query({
      sql: `INSERT INTO events (name, date_and_time, location, expiration)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
      params: [event.name, event.dateAndTime, event.location, event.expiration]
    })

    return { id: result.rows[0].id }
  }
}

module.exports = new EventDao()
