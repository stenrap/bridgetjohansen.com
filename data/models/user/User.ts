export default interface User {
  admin: boolean
  created: Date
  email: string
  firstName: string
  id: number
  lastLogin: Date
  lastName: string
  password: string
  studio: boolean
  token: string
}

export interface UserIdentifier {
  email?: string
  id?: number
  token?: string
}
