'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('group_class_student_times', {
      id: {
        type: 'integer',
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      student_id: {
        type: 'integer',
        notNull: true,
        foreignKey: {
          name: 'group_class_student_times_student_fk',
          table: 'students',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE'
          }
        }
      },
      group_class_time_id: {
        type: 'integer',
        notNull: true,
        foreignKey: {
          name: 'group_class_student_times_time_fk',
          table: 'group_class_times',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE'
          }
        }
      }
    })
  } catch (err) {
    logError(err)
  }
}

exports.down = async db => {
  return db.dropTable('group_class_student_times')
}

exports._meta = {
  version: 1
}
