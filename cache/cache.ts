import redis, { RedisClient, RetryStrategyOptions } from 'redis'

import logger from '../logger'

export const cache: RedisClient = redis.createClient({
  host: process.env.BRIDGET_CACHE_HOST,
  retry_strategy: (options: RetryStrategyOptions): void => {
    logger.error('Retry by redis client: %O', options)
  }
})

cache.on('error', (err: Error): void => {
  logger.error('Error encountered by redis client: %O', err)
})
