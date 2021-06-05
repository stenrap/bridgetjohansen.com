import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

import {
  gqlCreateAccountInput as CreateAccountInput
} from './CreateAccountInput'
import {
  gqlNonce as Nonce,
  gqlNonceType as NonceType
} from './Nonce'

const root: DocumentNode = gql`
  type Mutation {
    createAccount(account: CreateAccountInput!): Int!
  }
  
  type Query {
    getAccountCode(email: String!): Nonce!
  }
`

const typeDefs: DocumentNode[] = [
  root,
  CreateAccountInput,
  Nonce,
  NonceType
]

export default typeDefs
