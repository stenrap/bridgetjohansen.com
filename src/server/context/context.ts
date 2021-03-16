import { Request, Response } from 'express'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

import { selectUser } from '../data/user/user'
import { TOKEN_COOKIE } from '../../shared/constants'
import User from '../../shared/models/User'

export interface Context {
  req: Request,
  res: Response,
  user?: User
}

export const context = async ({ req, res }: ExpressContext): Promise<Context> => {
  const token: string = req.cookies[TOKEN_COOKIE]
  return { req, res, user: token ? await selectUser(token) : undefined}
}
