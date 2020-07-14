'use strict'

const BaseDao = require('./BaseDao')

class EventDao extends BaseDao {
  deleteEvent (id) {
    return this.query({
      sql: `DELETE FROM events
            WHERE id = $1`,
      params: [id]
    })
  }

  async insertEvent (event) {
    const result = await this.query({
      sql: `INSERT INTO events (name, date_and_time, location, expiration)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
      params: [event.name, event.dateAndTime, event.location, event.expiration]
    })

    return { id: result.rows[0].id }
  }

  async selectEvents () {
    const result = await this.query({
      sql: `SELECT *
            FROM events
            WHERE expiration > (now()::date)::timestamptz`,
      params: []
    })

    return result.rows
  }

  updateEvent (event) {
    return this.query({
      sql: `UPDATE events
            SET name = $1, date_and_time = $2, location = $3, expiration = $4
            WHERE id = $5`,
      params: [event.name, event.dateAndTime, event.location, event.expiration, event.id]
    })
  }
}

module.exports = new EventDao()
