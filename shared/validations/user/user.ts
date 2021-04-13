/* eslint-disable no-useless-escape */

import { MAX_STRING_LENGTH, MIN_PASSWORD_LENGTH } from '../../../constants'
import User from '../../../data/models/user/User'

export const validateEmail = (email: string): void => {
  if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email)) {
    throw new Error('That doesn\'t look like a valid email.')
  }

  if (email.length > MAX_STRING_LENGTH) {
    throw new Error('Please use an email with fewer characters.')
  }
}

export const validateFirstName = (firstName: string): void => {
  if (firstName.length === 0) {
    throw new Error('First name cannot be empty.')
  }

  if (firstName.length > MAX_STRING_LENGTH) {
    throw new Error('Please use fewer characters in your first name.')
  }
}

export const validateLastName = (lastName: string): void => {
  if (lastName.length === 0) {
    throw new Error('Last name cannot be empty.')
  }

  if (lastName.length > MAX_STRING_LENGTH) {
    throw new Error('Please use fewer characters in your last name.')
  }
}

export const validatePassword = (password: string): void => {
  if (password.length === 0) {
    throw new Error('Password cannot be empty.')
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
  }

  if (password.length > MAX_STRING_LENGTH) {
    throw new Error('Please use fewer characters in your password.')
  }
}

export const validateUser = (user?: User): User => {
  if (!user) {
    throw new Error('No such user.')
  }

  return user
}
