import { PoolClient, QueryResult } from 'pg'

import { query } from '../../db'
import logger from '../../../logger'
import User from '../../models/user/User'

export const selectUser = async (token: string, client?: PoolClient): Promise<User | undefined> => {
  try {
    const sql = `
      SELECT *
      FROM users
      WHERE token = $1
    `
    const params: unknown[] = [token]
    const result: QueryResult = client
      ? await client.query(sql, params)
      : await query(sql, params)
    return result.rows[0]
  } catch (err) {
    logger.error(`Error selecting user from database with token ${token}`)
    logger.error(err.message)
  }
}
