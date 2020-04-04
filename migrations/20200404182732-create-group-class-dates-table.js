'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  await db.createTable('group_class_dates', {
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

  await db.addIndex('group_class_dates', 'group_class_dates_index', ['month', 'date', 'year'], true, logError)
}

exports.down = async db => {
  return db.dropTable('group_class_dates')
}

exports._meta = {
  version: 1
}
