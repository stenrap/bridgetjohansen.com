import { createCode } from '../../../lib/code/code'
import { insertUser, selectUser } from '../../../data/api/user/user'
import { setCode } from '../../../cache/user'
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
import User, { InsertedUser } from '../../../data/models/user/User'

/**
 * Creates a non-admin, non-studio account
 *
 * @param _ Root value passed to GraphQL executor
 * @param account CreateAccountInput with all properties needed to create an account
 */
export const createAccount = async (
  _: undefined,
  { account }: { account: CreateAccountInput }
): Promise<number> => {
  const { code, email, firstName, lastName, nonce, password } = account

  validateCode(code)
  validateEmail(email)
  validateFirstName(firstName)
  validateLastName(lastName)
  validateNonce(nonce)
  validatePassword(password)

  /*
    TODO and WYLO ....
      1. Encode the password via bcrypt.
      2. Create a token (it's an empty string below).
      3. Cache the user.
   */

  const user: InsertedUser = await insertUser({
    admin: false,
    email,
    firstName,
    lastName,
    password,
    studio: false,
    token: ''
  })

  return user.id
}

/**
 * Emails a 6-digit verification code as part of account creation
 *
 * @param _ Root value passed to GraphQL executor
 * @param email Email to which 6-digit code should be sent
 */
export const sendAccountCode = async (
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
