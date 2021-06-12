import crypto from 'crypto'

import { cache } from './cache'
import { TOKEN_EXPIRATION } from '../constants'
import CodeType from './CodeType'
import logger from '../logger'
import User from '../data/models/user/User'

const CODE_EXPIRATION = 60 * 10 // 10 minutes (in seconds)

export const cacheUser = (user: User): Promise<void> => {
  return new Promise<void>((resolve: (value: void) => void): void => {
    cache.set(`user:${user.token}`, JSON.stringify(user), 'PX', TOKEN_EXPIRATION, (err: Error | null): void => {
      if (err) {
        logger.error(`Error adding user ${user.email} to cache`)
        logger.error(err.message)
      }

      resolve()
    })
  })
}

export const deleteUser = (token: string): Promise<void> => {
  return new Promise<void>((resolve: (value: void) => void): void => {
    cache.del(`user:${token}`, (err: Error | null): void => {
      if (err) {
        logger.error(`Error deleting user with token ${token} from cache`)
        logger.error(err.message)
      }

      resolve()
    })
  })
}

export const setCode = (type: CodeType, code: string, email: string): Promise<string> => {
  return new Promise<string>((resolve: (value: string) => void, reject: (err: Error) => void): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const nonce: string = crypto.createHmac(process.env.BRIDGET_HMAC_ALGORITHM!, process.env.BRIDGET_HMAC_SECRET!)
      .update(email)
      .digest('hex')

    cache.set(`${type}:${nonce}`, code, 'EX', CODE_EXPIRATION, 'NX', (err: Error | null): void => {
      if (err) {
        logger.error('Error setting code in cache')
        logger.error(err.message)
        return reject(new Error('We hit a snag sending you a verification code. Please try again later.'))
      }

      resolve(nonce)
    })
  })
}
