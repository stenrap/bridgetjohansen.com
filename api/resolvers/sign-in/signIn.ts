import { PoolClient } from 'pg'
import { v4 as uuidv4 } from 'uuid'

import { cacheUser, deleteUser } from '../../../cache/user'
import { Context } from '../../context/context'
import { endTxn, startTxn } from '../../../data/db'
import { isValidPassword } from '../../lib/password/password'
import { selectUser } from '../../../data/api/user/user'
import { setTokenCookie } from '../../lib/cookie/cookie'
import { signIn as dbSignIn } from '../../../data/api/sign-in/signIn'
import { validateEmail, validatePassword } from '../../../shared/validations/user/user'
import SignInInput from '../../../shared/types/SignInInput'
import User from '../../../data/models/user/User'

/**
 * Signs a user in
 *
 * @param _ Root value passed to GraphQL executor
 * @param email User's email
 * @param password User's password
 * @param res ServerResponse instance obtained from context
 */
export const signIn = async (
  _: undefined,
  { credentials }: { credentials: SignInInput },
  { res }: Context
): Promise<Omit<User, 'password' | 'token'>> => {
  const { email, password } = credentials
  validateEmail(email)
  validatePassword(password)

  const client: PoolClient = await startTxn()

  try {
    const user: User | undefined = await selectUser({ email }, client)

    // The password will be defined if the user exists, so we disable the non-null assertion warning.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!user || !(await isValidPassword(password, user.password!))) {
      throw new Error('Error signing in. Please check your email and password.')
    }

    const oldToken: string = user.token
    user.lastLogin = new Date()
    user.token = uuidv4().replace(/-/g, '')

    await dbSignIn({ ...user }, client)
    await endTxn(client)

    delete user.password
    await deleteUser(oldToken)
    await cacheUser(user)
    setTokenCookie(res, user.token)
    return user
  } catch (err) {
    await endTxn(client, { commit: false })
    throw err
  }
}
