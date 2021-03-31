import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

const root: DocumentNode = gql`
  type Query {
    isEmailAvailable(email: String!): Boolean!
  }
`

const typeDefs: DocumentNode[] = [
  root
]

export default typeDefs
