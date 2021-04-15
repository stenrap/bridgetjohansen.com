import { isEmailAvailable, sendAccountCode } from './create-account/createAccount'

const resolvers = {
  Query: {
    isEmailAvailable,
    sendAccountCode
  }
}

export default resolvers
