import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Mutation {
    signIn(googleToken: String!): User!
  }
  
  type Query {
    fetchUser: User
  }
  
  type User {
    admin: Boolean!
    email: String!
    id: ID!
  }
`

export default typeDefs
