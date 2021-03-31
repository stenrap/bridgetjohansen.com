/* eslint-disable no-useless-escape */

import { MAX_STRING_LENGTH } from '../../../constants'
import User from '../../../data/models/user/User'

export const validateEmail = (email: string): void => {
  if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email)) {
    throw new Error('That doesn\'t look like a valid email.')
  }

  if (email.length > MAX_STRING_LENGTH) {
    throw new Error(`Emails cannot have more than ${MAX_STRING_LENGTH} characters.`)
  }
}

export const validateUser = (user?: User): User => {
  if (!user) {
    throw new Error('No such user.')
  }

  return user
}
