'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('student_user_emails', {
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
          name: 'student_user_emails_student_fk',
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
          name: 'student_user_emails_user_fk',
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
  return db.dropTable('student_user_emails')
}

exports._meta = {
  version: 1
}
