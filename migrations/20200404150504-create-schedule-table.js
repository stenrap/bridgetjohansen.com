'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('schedule', {
      id: {
        type: 'integer',
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      month: {
        type: 'integer',
        notNull: true
      },
      date: {
        type: 'integer',
        notNull: true
      },
      year: {
        type: 'integer',
        notNull: true
      }
    })

    await db.runSql(
      `INSERT INTO schedule (month, date, year)
       VALUES (8, 14, 2019)`,
      [],
      logError
    )
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
