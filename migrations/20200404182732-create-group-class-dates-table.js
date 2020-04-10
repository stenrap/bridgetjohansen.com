'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('group_class_dates', {
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

    await db.addIndex('group_class_dates', 'group_class_dates_index', ['month', 'date', 'year'], true, logError)
  } catch (err) {
    logError(err)
  }
}

exports.down = async db => {
  return db.dropTable('group_class_dates')
}

exports._meta = {
  version: 1
}
