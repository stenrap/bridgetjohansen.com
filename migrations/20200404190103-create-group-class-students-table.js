'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('group_class_students', {
      id: {
        type: 'integer',
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      student_id: {
        type: 'integer',
        notNull: true,
        unique: true,
        foreignKey: {
          name: 'group_class_students_student_fk',
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
          name: 'group_class_students_time_fk',
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
  return db.dropTable('group_class_students')
}

exports._meta = {
  version: 1
}
