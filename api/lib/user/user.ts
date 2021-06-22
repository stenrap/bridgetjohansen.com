import { getUser as getCachedUser } from '../../../cache/user'
import { selectUser } from '../../../data/api/user/user'
import User from '../../../data/models/user/User'

export const getUser = async (token?: string): Promise<User | undefined> => {
  if (!token) return
  let user: User | undefined = await getCachedUser(token)
  if (!user) user = await selectUser({ token })
  return user
}
