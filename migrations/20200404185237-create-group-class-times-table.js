'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('group_class_times', {
      id: {
        type: 'integer',
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      hour: {
        type: 'integer',
        notNull: true
      },
      minutes: {
        type: 'integer',
        notNull: true
      },
      meridiem: {
        type: 'text',
        notNull: true
      }
    })
  } catch (err) {
    logError(err)
  }
}

exports.down = async db => {
  return db.dropTable('group_class_times')
}

exports._meta = {
  version: 1
}
