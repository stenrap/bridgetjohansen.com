import { PoolClient } from 'pg'
import { v4 as uuidv4 } from 'uuid'

import { cacheUser, setCode } from '../../../cache/user'
import { Context } from '../../context/context'
import { createCode } from '../../../lib/code/code'
import { endTxn, startTxn } from '../../../data/db'
import { hashPassword } from '../../../lib/password/password'
import { insertUser, selectUser } from '../../../data/api/user/user'
import { setTokenCookie } from '../../../lib/cookie/cookie'
import { validateCode } from '../../../shared/validations/code/code'
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword
} from '../../../shared/validations/user/user'
import { validateNonce } from '../../../shared/validations/nonce/nonce'
import CodeType from '../../../cache/CodeType'
import CreateAccountInput from '../../../shared/types/CreateAccountInput'
import Nonce, { NonceType } from '../../../shared/types/Nonce'
import User from '../../../data/models/user/User'

/**
 * Creates a non-admin, non-studio account
 *
 * @param _ Root value passed to GraphQL executor
 * @param account CreateAccountInput with all properties needed to create an account
 * @param res ServerResponse instance obtained from context
 */
export const createAccount = async (
  _: undefined,
  { account }: { account: CreateAccountInput },
  { res }: Context
): Promise<number> => {
  const { code, email, firstName, lastName, nonce, password } = account

  validateCode(code)
  validateEmail(email)
  validateFirstName(firstName)
  validateLastName(lastName)
  validateNonce(nonce)
  validatePassword(password)

  const client: PoolClient = await startTxn()

  try {
    let user: User | undefined = await selectUser({ email }, client)
    if (user) throw new Error('Error creating account.')

    const token: string = uuidv4().replace(/-/g, '')

    user = await insertUser(
      {
        admin: false,
        created: new Date(),
        email,
        firstName,
        id: 0,
        lastLogin: new Date(),
        lastName,
        studio: false,
        token
      }, await hashPassword(password), client)
    await endTxn(client)

    await cacheUser(user)
    setTokenCookie(res, token)
    return user.id
  } catch (err) {
    await endTxn(client, { commit: false })
    throw err
  }
}

/**
 * Emails a 6-digit verification code as part of account creation
 *
 * @param _ Root value passed to GraphQL executor
 * @param email Email to which 6-digit code should be sent
 */
export const getAccountCode = async (
  _: undefined,
  { email }: { email: string }
): Promise<Nonce> => {
  validateEmail(email)

  const user: User | undefined = await selectUser({ email })
  if (user) {
    // TODO: When password reset is ready, put the user into that flow instead of throwing an error.
    throw new Error('You already have an account...')
  }

  const code: string = createCode()
  const nonce: string = await setCode(CodeType.NEW, code, email)

  // TODO: Send a message to the production worker queue that causes the worker to send an email to the recipient with the 6-digit code.

  return {
    nonce,
    type: NonceType.NEW
  }
}
