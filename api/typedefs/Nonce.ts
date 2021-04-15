import { gql } from 'apollo-server-micro'

/*
  If these types are changed, don't forget to change
  their counterparts in the /shared/types directory.
*/

export const gqlNonceType = gql`
  enum NonceType {
    NEW
    RESET
  }
`

export const gqlNonce = gql`
  type Nonce {
    nonce: String!
    type: NonceType!
  }
`
