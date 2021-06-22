import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

import { getFields } from '../lib/graphql/graphql'
import CreateAccountInput from '../../shared/types/CreateAccountInput'

const gqlTypeMap: Record<keyof CreateAccountInput, string> = {
  code: 'String!',
  email: 'String!',
  firstName: 'String!',
  lastName: 'String!',
  nonce: 'String!',
  password: 'String!'
}

export const gqlCreateAccountInput: DocumentNode = gql`
  input CreateAccountInput {
    ${getFields(gqlTypeMap)}
  }
`
