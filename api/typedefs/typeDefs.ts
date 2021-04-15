import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

import {
  gqlNonce as Nonce,
  gqlNonceType as NonceType
} from './Nonce'

const root: DocumentNode = gql`
  type Query {
    isEmailAvailable(email: String!): Boolean!
    sendAccountCode(email: String!): Nonce!
  }
`

const typeDefs: DocumentNode[] = [
  root,
  Nonce,
  NonceType
]

export default typeDefs
