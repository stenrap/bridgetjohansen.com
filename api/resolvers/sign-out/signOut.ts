import { AuthenticationError } from 'apollo-server-micro'

import { clearTokenCookie } from '../../lib/cookie/cookie'
import { Context } from '../../context/context'
import { deleteUser } from '../../../cache/user'
import { signOut as dbSignOut } from '../../../data/api/sign-out/signOut'

/**
 * Signs a user out by scrambling their token in the database,
 * deleting them from the cache, and clearing their cookie.
 *
 * @param _ Root value passed to GraphQL executor
 * @param __ Resolver arguments (none for this API)
 * @param res ServerResponse instance obtained from context
 * @param user User instance obtained from context
 */
export const signOut = async (
  _: undefined,
  __: undefined,
  { res, user }: Context
): Promise<boolean> => {
  if (!user) throw new AuthenticationError('User not found.')

  await dbSignOut(user.id)
  await deleteUser(user.token)
  clearTokenCookie(res)

  return true
}
