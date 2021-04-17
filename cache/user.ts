import crypto from 'crypto'

import { cache } from './cache'
import CodeType from './CodeType'
import logger from '../logger'

const CODE_EXPIRATION = 60 * 10 // 10 minutes (in seconds)

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
