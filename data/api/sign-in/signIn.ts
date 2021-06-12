import { PoolClient } from 'pg'

import { query } from '../../db'
import User from '../../models/user/User'

export const signIn = async (user: Pick<User, 'id' | 'lastLogin' | 'token'>, client?: PoolClient): Promise<void> => {
  const { id, lastLogin, token } = user

  const sql = `
    UPDATE users
    SET last_login = $1, token = $2
    WHERE id = $3
  `

  const params: unknown[] = [lastLogin, token, id]

  client
    ? await client.query(sql, params)
    : await query(sql, params)
}
