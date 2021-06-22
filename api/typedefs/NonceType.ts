import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

import { getEnumFields } from '../lib/graphql/graphql'
import NonceType from '../../shared/types/NonceType'

export const gqlNonceType: DocumentNode = gql`
  enum NonceType {
    ${getEnumFields(NonceType)}
  }
`
