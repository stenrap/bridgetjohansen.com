import { selectUser } from '../../../data/api/user/user'
import { validateEmail } from '../../../shared/validations/user/user'

/**
 * Checks whether an email is available (i.e. not associated with an existing user)
 *
 * @param _ Root value passed to GraphQL executor
 * @param email Email to check
 */
export const isEmailAvailable = async (
  _: undefined,
  { email }: { email: string }
): Promise<boolean> => {
  validateEmail(email)

  // TODO: If the user already exists, put them into the password reset flow (this is what Facebook does).

  return (await selectUser({ email })) === undefined
}
