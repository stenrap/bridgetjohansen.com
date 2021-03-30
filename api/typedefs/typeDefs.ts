import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Mutation {
    
  }
  
  type Query {
    isEmailAvailable(email: String!): Boolean!
  }
`

export default typeDefs
