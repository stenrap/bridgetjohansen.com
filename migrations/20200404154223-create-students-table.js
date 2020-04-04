'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('students', {
      id: {
        type: 'INTEGER',
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      name: {
        type: 'text',
        notNull: true
      },
      parents: {
        type: 'text',
        notNull: true
      },
      phone: {
        type: 'text',
        notNull: true
      },
      lesson_day: {
        type: 'INTEGER',
        notNull: true
      },
      lesson_hour: {
        type: 'INTEGER',
        notNull: true
      },
      lesson_minutes: {
        type: 'INTEGER',
        notNull: true
      },
      lesson_duration: {
        type: 'INTEGER',
        notNull: true
      }
    })
  } catch (err) {
    logError(err)
  }
}

exports.down = async db => {
  return db.dropTable('students')
}

exports._meta = {
  version: 1
}
