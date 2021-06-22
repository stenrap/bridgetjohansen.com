import { CookieSerializeOptions, parse, serialize } from 'cookie'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'

import { TOKEN_COOKIE_NAME, TOKEN_EXPIRATION } from '../../../constants'

export const clearTokenCookie = (res: ServerResponse): void => {
  setTokenCookie(res, '', new Date(1))
}

export const getTokenFromCookie = (req: MicroRequest): string | undefined => {
  if (req.headers.cookie) {
    return parse(req.headers.cookie)[TOKEN_COOKIE_NAME]
  }
}

export const setTokenCookie = (res: ServerResponse, token: string, expires?: Date): void => {
  const options: CookieSerializeOptions = {
    domain: 'bridgetjohansen.com',
    expires: expires || new Date(Date.now() + TOKEN_EXPIRATION),
    httpOnly: true,
    path: '/',
    secure: true
  }
  res.setHeader('Set-Cookie', serialize(TOKEN_COOKIE_NAME, token, options))
}
