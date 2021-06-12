import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

import { getFields } from '../../lib/graphql/graphql'
import User from '../../data/models/user/User'

const gqlTypeMap: Record<keyof Omit<User, 'password' | 'token'>, string> = {
  admin: 'Boolean!',
  created: 'String!',
  email: 'String!',
  firstName: 'String!',
  id: 'Int!',
  lastLogin: 'String!',
  lastName: 'String!',
  studio: 'Boolean!'
}

export const gqlUser: DocumentNode = gql`
  type User {
    ${getFields(gqlTypeMap)}
  }
`
