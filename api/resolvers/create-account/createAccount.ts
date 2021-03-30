/**
 * Checks whether an email is available (i.e. not associated with an existing user)
 *
 * @param _ Root GraphQL value
 * @param email Email to check
 */
export const isEmailAvailable = async (
  _: undefined,
  { email }: { email: string }
): Promise<boolean> => {
  console.log(email)
  // TODO: Validate the email before hitting the db (keep it basic?)
  return true
}
