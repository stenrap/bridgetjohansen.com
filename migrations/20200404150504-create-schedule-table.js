'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('schedule', {
      id: {
        type: 'INTEGER',
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      month: {
        type: 'INTEGER',
        notNull: true
      },
      date: {
        type: 'INTEGER',
        notNull: true
      },
      year: {
        type: 'INTEGER',
        notNull: true
      }
    })
  } catch (err) {
    logError(err)
  }
}

exports.down = async db => {
  return db.dropTable('schedule')
}

exports._meta = {
  version: 1
}
