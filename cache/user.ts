import crypto from 'crypto'

import { setex } from './cache'
import CodeType from './CodeType'
import logger from '../logger'

const CODE_EXPIRATION = 60 * 10 // 10 minutes (in seconds)

export const setCode = async (type: CodeType, code: string, email: string): Promise<string> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const nonce: string = crypto.createHmac(process.env.BRIDGET_HMAC_ALGORITHM!, process.env.BRIDGET_HMAC_SECRET!)
      .update(email)
      .digest('hex')
    await setex(`${type}:${nonce}`, CODE_EXPIRATION, code)
    return nonce
  } catch (err) {
    logger.error('Error setting code in cache')
    logger.error(err.message)
    throw new Error('We hit a snag generating a verification code. Please try again later.')
  }
}
