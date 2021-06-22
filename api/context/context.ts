import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'

import { getTokenFromCookie } from '../lib/cookie/cookie'
import { getUser } from '../lib/user/user'
import User from '../../data/models/user/User'

export interface Context {
  req: MicroRequest,
  res: ServerResponse,
  user?: User
}

export interface MicroContext {
  req: MicroRequest,
  res: ServerResponse
}

export const context = async ({ req, res }: MicroContext): Promise<Context> => {
  const user: User | undefined = await getUser(getTokenFromCookie(req))
  if (user) delete user.password
  return { req, res, user }
}
