import { TokenPayload } from 'google-auth-library'
import { ValidationError } from 'apollo-server-express'

export const validateGoogleId = (googleId?: string): string => {
  if (!googleId) {
    throw new ValidationError('Invalid Google ID.')
  }

  return googleId
}

export const validatePayload = (payload?: TokenPayload): TokenPayload => {
  if (!payload) {
    throw new ValidationError('Error signing in with Google.')
  }

  return payload
}
