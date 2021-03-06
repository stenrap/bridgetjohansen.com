'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('students', {
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
      lesson_day: {
        type: 'integer',
        notNull: true
      },
      lesson_hour: {
        type: 'integer',
        notNull: true
      },
      lesson_minutes: {
        type: 'integer',
        notNull: true
      },
      lesson_meridiem: {
        type: 'text',
        notNull: true
      },
      lesson_duration: {
        type: 'integer',
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
