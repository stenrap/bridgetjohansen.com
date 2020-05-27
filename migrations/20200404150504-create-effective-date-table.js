'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('effective_date', {
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
      `INSERT INTO effective_date (month, date, year)
       VALUES (5, 2, 2020)`,
      [],
      logError
    )
  } catch (err) {
    logError(err)
  }
}

exports.down = async db => {
  return db.dropTable('effective_date')
}

exports._meta = {
  version: 1
}
