'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('events', {
      id: {
        type: 'integer',
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      name: {
        type: 'text',
        notNull: true
      },
      date_and_time: {
        type: 'text',
        notNull: true
      },
      location: {
        type: 'text',
        notNull: true
      },
      expiration: {
        type: 'timestamptz',
        notNull: true
      }
    })

    await db.addIndex('events', 'events_expiration_index', ['expiration'], false, logError)
  } catch (err) {
    logError(err)
  }
}

exports.down = async db => {
  return db.dropTable('events')
}

exports._meta = {
  version: 1
}
