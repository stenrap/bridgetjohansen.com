import { createAccount, sendAccountCode } from './create-account/createAccount'

const resolvers = {
  Mutation: {
    createAccount
  },
  Query: {
    sendAccountCode
  }
}

export default resolvers
