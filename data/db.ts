/* eslint-disable @typescript-eslint/no-var-requires */

import pg, { Pool, PoolClient, QueryResult } from 'pg'
const pgCamelCase = require('pg-camelcase')

import logger from '../logger'

pgCamelCase.inject(pg)

const pool = new Pool({
  database: process.env.BRIDGET_DB_NAME,
  host: process.env.BRIDGET_DB_HOST,
  idleTimeoutMillis: 60000,
  password: process.env.BRIDGET_DB_PASSWORD,
  port: 5432,
  user: process.env.BRIDGET_DB_USER
})

pool.on('error', (err: Error): void => {
  logger.error('Database pool error!')
  logger.error(err.message)
})

export interface PoolTxnOptions {
  commit: boolean
}

export const endPool = async (): Promise<void> => {
  try {
    return await pool.end()
  } catch (err) {
    logger.error('Failed to end connection pool')
    logger.error(err.message)
  }
}

export const endTxn = async (client: PoolClient, { commit }: PoolTxnOptions = { commit: true }): Promise<void> => {
  try {
    commit
      ? await client.query('COMMIT')
      : await client.query('ROLLBACK')
  } catch (err) {
    logger.error('Failed to commit or rollback transaction')
    logger.error(err.message)
  } finally {
    client.release()
  }
}

export const query = <T> (sql: string, params?: unknown[]): Promise<QueryResult<T>> => {
  return pool.query<T>(sql, params)
}

export const startTxn = async (): Promise<PoolClient> => {
  try {
    const client: PoolClient = await pool.connect()
    await client.query('BEGIN')
    return client
  } catch (err) {
    logger.error('Error starting database transaction!')
    logger.error(err.message)
    throw err
  }
}
