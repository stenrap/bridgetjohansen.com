import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library'
import { ResolverFn } from 'apollo-server-express'

import { validateEmail, validateUser } from '../../../lib/user/user'
import { validateGoogleId, validatePayload } from '../../../lib/google/google'
import { Context } from '../../context/context'
import User from '../../../data/models/user/User'

const client = new OAuth2Client(process.env.BRIDGET_GOOGLE_CLIENT_ID)

export const fetchUser = (
  _: ResolverFn,
  __: undefined,
  { user }: Context
): User => {
  return validateUser(user)
}

export const signIn = async (
  _: ResolverFn,
  { googleToken }: { googleToken: string }
): Promise<User> => {
  const ticket: LoginTicket = await client.verifyIdToken({
    audience: process.env.BRIDGET_GOOGLE_CLIENT_ID,
    idToken: googleToken
  })

  const payload: TokenPayload = validatePayload(ticket.getPayload())
  const email: string = validateEmail(payload.email)
  const googleId: string = validateGoogleId(payload.sub)

  // TODO .... Instead of implementing the same old data layer signIn function, start a txn here, do the things, and commit
  return {
    admin: false,
    email,
    googleId,
    id: 123,
    parentId: 456
  }
}
