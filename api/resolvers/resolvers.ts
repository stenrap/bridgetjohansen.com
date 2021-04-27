import { createAccount, getAccountCode } from './create-account/createAccount'

const resolvers = {
  Mutation: {
    createAccount
  },
  Query: {
    getAccountCode
  }
}

export default resolvers
