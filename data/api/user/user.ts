import { PoolClient, QueryResult } from 'pg'

import { query } from '../../db'
import User, { UserIdentifier } from '../../models/user/User'

/**
 * Inserts and returns a User
 *
 * @param user User instance to be inserted
 * @param password Password for the user
 * @param client Optional database pool client
 */
export const insertUser = async (user: User, password: string, client?: PoolClient): Promise<User> => {
  const { admin, email, firstName, lastName, studio, token } = user

  const sql = `
    INSERT INTO users (admin, email, first_name, last_name, password, studio, token)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `
  const params: unknown[] = [admin, email, firstName, lastName, password, studio, token]

  const result: QueryResult<{ id: number }> = client
    ? await client.query(sql, params)
    : await query(sql, params)

  user.id = result.rows[0].id
  return user
}

/**
 * Looks up a user by email, id, or token
 *
 * @param identifier UserIdentifier instance with email, id, or token
 * @param client Optional database pool client
 */
export const selectUser = async (identifier: UserIdentifier, client?: PoolClient): Promise<User | undefined> => {
  let sql = `
    SELECT admin, created, email, first_name, id, last_login, last_name, password, studio, token
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

  if (params.length === 0) throw new Error('Cannot select user without identifier.')

  const result: QueryResult<User> = client
    ? await client.query(sql, params)
    : await query(sql, params)

  return result.rows[0]
}
