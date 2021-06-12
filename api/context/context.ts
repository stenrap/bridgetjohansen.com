import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'

import { getTokenFromCookie } from '../../lib/cookie/cookie'
import { selectUser } from '../../data/api/user/user'
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
  const token: string | undefined = getTokenFromCookie(req)
  const user: User | undefined = token ? await selectUser({ token }) : undefined
  if (user) delete user.password
  return { req, res, user }
}
