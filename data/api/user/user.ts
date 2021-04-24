import { PoolClient, QueryResult } from 'pg'

import { query } from '../../db'
import User, { InsertedUser, NewUser, UserIdentifier } from '../../models/user/User'

/**
 * Inserts a NewUser and returns an InsertedUser
 *
 * @param user NewUser instance to be inserted
 * @param client Optional database pool client
 */
export const insertUser = async (user: NewUser, client?: PoolClient): Promise<InsertedUser> => {
  const { admin, email, firstName, lastName, password, studio, token } = user

  const sql = `
    INSERT INTO users (admin, email, first_name, last_name, password, studio, token)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `
  const params: unknown[] = [admin, email, firstName, lastName, password, studio, token]

  const result: QueryResult<{ id: number }> = client
    ? await client.query(sql, params)
    : await query(sql, params)

  return { admin, email, firstName, id: result.rows[0].id, lastName, studio, token }
}

/**
 * Looks up a user by email, id, or token
 *
 * @param identifier UserIdentifier instance with email, id, or token
 * @param client Optional database pool client
 */
export const selectUser = async (identifier: UserIdentifier, client?: PoolClient): Promise<User | undefined> => {
  let sql = `
    SELECT admin, created, email, firstName, id, lastLogin, lastName, studio, token
    FROM users
    WHERE
  `

  const params: unknown[] = []

  if (identifier.email) {
    params.push(identifier.email)
    sql += ' email = $1'
  } else if (identifier.id) {
    params.push(identifier.id)
    sql += ' id = $1'
  } else if (identifier.token) {
    params.push(identifier.token)
    sql += ' token = $1'
  }

  if (params.length === 0) throw new Error('Cannot select user without identifier')

  const result: QueryResult<User> = client
    ? await client.query(sql, params)
    : await query(sql, params)

  return result.rows[0]
}
