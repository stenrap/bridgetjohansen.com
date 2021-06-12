import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

import { gqlCreateAccountInput as CreateAccountInput } from './CreateAccountInput'
import { gqlNonce as Nonce } from './Nonce'
import { gqlNonceType as NonceType } from './NonceType'
import { gqlSignInInput as SignInInput } from './SignInInput'
import { gqlUser as User } from './User'

const root: DocumentNode = gql`
  type Mutation {
    createAccount(account: CreateAccountInput!): Int!
    signIn(credentials: SignInInput!): User!
  }
  
  type Query {
    getAccountCode(email: String!): Nonce!
  }
`

const typeDefs: DocumentNode[] = [
  root,
  CreateAccountInput,
  Nonce,
  NonceType,
  SignInInput,
  User
]

export default typeDefs
