import { promisify } from 'util'
import redis, { RedisClient, RetryStrategyOptions } from 'redis'

import logger from '../logger'

const client: RedisClient = redis.createClient({
  host: process.env.BRIDGET_CACHE_HOST,
  retry_strategy: (options: RetryStrategyOptions): void => {
    logger.error('Retry by redis client: %O', options)
  }
})

client.on('error', (err: Error): void => {
  logger.error('Error encountered by redis client: %O', err)
})

export const set = promisify(client.set).bind(client)
export const setex = promisify(client.setex).bind(client)
