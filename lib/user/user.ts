import { ValidationError } from 'apollo-server-micro'

import User from '../../data/models/user/User'

export const validateEmail = (email?: string): string => {
  if (!email) {
    throw new ValidationError('Invalid email.')
  }

  return email
}

export const validateUser = (user?: User): User => {
  if (!user) {
    throw new ValidationError('No such user.')
  }

  return user
}
