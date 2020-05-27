'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('student_parents', {
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
          name: 'student_parents_student_fk',
          table: 'students',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE'
          }
        }
      },
      parent_id: {
        type: 'integer',
        notNull: true,
        foreignKey: {
          name: 'student_parents_parent_fk',
          table: 'parents',
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
  return db.dropTable('student_parents')
}

exports._meta = {
  version: 1
}
