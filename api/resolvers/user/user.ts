import { validateUser } from '../../../lib/user/user'
import { Context } from '../../context/context'
import User from '../../../data/models/user/User'

export const fetchUser = (
  _: undefined,
  __: undefined,
  { user }: Context
): User => {
  return validateUser(user)
}
