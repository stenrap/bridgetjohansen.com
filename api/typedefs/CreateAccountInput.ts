import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

/*
  If this type is changed, don't forget to change
  its counterpart in the /shared/types directory.
*/

export const gqlCreateAccountInput: DocumentNode = gql`
  input CreateAccountInput {
    code: String!
    email: String!
    firstName: String!
    lastName: String!
    nonce: String!
    password: String!
  }
`
