import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

import { getFields } from '../lib/graphql/graphql'
import SignInInput from '../../shared/types/SignInInput'

const gqlTypeMap: Record<keyof SignInInput, string> = {
  email: 'String!',
  password: 'String!'
}

export const gqlSignInInput: DocumentNode = gql`
  input SignInInput {
    ${getFields(gqlTypeMap)}
  }
`
