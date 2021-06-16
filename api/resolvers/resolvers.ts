import { createAccount, getAccountCode } from './create-account/createAccount'
import { signIn } from './sign-in/signIn'
import { signOut } from './sign-out/signOut'

const resolvers = {
  Mutation: {
    createAccount,
    signIn,
    signOut
  },
  Query: {
    getAccountCode
  }
}

export default resolvers
