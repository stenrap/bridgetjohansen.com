'use strict'

const logError = (err) => {
  if (err) console.log(`Error in ${__filename} migration:`, err)
}

exports.up = async db => {
  try {
    await db.createTable('users', {
      id: {
        type: 'integer',
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      email: {
        type: 'text',
        notNull: true
      },
      google_id: {
        type: 'text'
      },
      token: {
        type: 'text'
      },
      admin: {
        type: 'boolean',
        defaultValue: false,
        notNull: true
      }
    })

    await db.addIndex('users', 'users_email_index', ['email'], true, logError)
    await db.addIndex('users', 'users_google_id_index', ['google_id'], false, logError)
    await db.addIndex('users', 'users_token_index', ['token'], false, logError)

    await db.runSql(
      `INSERT INTO users (email, admin)
       VALUES
       ('email@bridgetjohansen.com', true),
       ('admin@bridgetjohansen.com', true),
       ('rob.johansen@gmail.com', false)`
    )
  } catch (err) {
    logError(err)
  }
}

exports.down = async db => {
  return db.dropTable('users')
}

exports._meta = {
  version: 1
}
