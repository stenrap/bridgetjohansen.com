import { createAccount, getAccountCode } from './create-account/createAccount'
import { signIn } from './sign-in/signIn'

const resolvers = {
  Mutation: {
    createAccount,
    signIn
  },
  Query: {
    getAccountCode
  }
}

export default resolvers
