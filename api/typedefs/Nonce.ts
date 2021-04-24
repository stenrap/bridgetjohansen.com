import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

/*
  If these types are changed, don't forget to change
  their counterparts in the /shared/types directory.
*/

export const gqlNonceType: DocumentNode = gql`
  enum NonceType {
    NEW
    RESET
  }
`

export const gqlNonce: DocumentNode = gql`
  type Nonce {
    nonce: String!
    type: NonceType!
  }
`
