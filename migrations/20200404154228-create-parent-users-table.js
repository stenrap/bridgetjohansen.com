'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('parent_users', {
      id: {
        type: 'integer',
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      parent_id: {
        type: 'integer',
        notNull: true,
        foreignKey: {
          name: 'parent_users_parent_fk',
          table: 'parents',
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
          name: 'parent_users_user_fk',
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
  return db.dropTable('parent_users')
}

exports._meta = {
  version: 1
}
