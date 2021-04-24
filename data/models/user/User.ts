export default interface User {
  admin: boolean
  created: Date
  email: string
  firstName: string
  id: number
  lastLogin: Date
  lastName: string
  studio: boolean
  token: string
}

export interface NewUser {
  admin: boolean
  email: string
  firstName: string
  lastName: string
  password: string
  studio: boolean
  token: string
}

export interface InsertedUser {
  admin: boolean
  email: string
  firstName: string
  id: number
  lastName: string
  studio: boolean
  token: string
}

export interface UserIdentifier {
  email?: string
  id?: number
  token?: string
}
