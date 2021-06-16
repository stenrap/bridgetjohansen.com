import { PoolClient } from 'pg'
import { v4 as uuidv4 } from 'uuid'

import { query } from '../../db'

export const signOut = async (userId: number, client?: PoolClient): Promise<void> => {
  const sql = `
    UPDATE users
    SET token = $1
    WHERE id = $2
  `

  const params: unknown[] = [uuidv4().replace(/-/g, ''), userId]

  client
    ? await client.query(sql, params)
    : await query(sql, params)
}
