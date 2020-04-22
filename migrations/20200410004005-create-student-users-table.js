'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('student_users', {
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
          name: 'student_users_student_fk',
          table: 'students',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE'
          }
        }
      },
      user_id: {
        type: 'integer',
        notNull: true,
        foreignKey: {
          name: 'student_users_user_fk',
          table: 'users',
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
  return db.dropTable('student_users')
}

exports._meta = {
  version: 1
}
