import { PoolClient, QueryResult } from 'pg'

import { query } from '../../db'
import User, { UserIdentifier } from '../../models/user/User'

export const selectUser = async (identifier: UserIdentifier, client?: PoolClient): Promise<User | undefined> => {
  let sql = `
    SELECT *
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

  const result: QueryResult = client
    ? await client.query(sql, params)
    : await query(sql, params)

  return result.rows[0]
}
