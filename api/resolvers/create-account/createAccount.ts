import { createCode } from '../../../lib/code/code'
import { selectUser } from '../../../data/api/user/user'
import { setCode } from '../../../cache/user'
import { validateEmail } from '../../../shared/validations/user/user'
import CodeType from '../../../cache/CodeType'
import Nonce, { NonceType } from '../../../shared/types/Nonce'
import User from '../../../data/models/user/User'

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

// TODO and WYLO .... Implement the API for creating an account!
