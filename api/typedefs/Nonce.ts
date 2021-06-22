import { DocumentNode } from 'graphql'
import { gql } from 'apollo-server-micro'

import { getFields } from '../lib/graphql/graphql'
import Nonce from '../../shared/types/Nonce'

const gqlTypeMap: Record<keyof Nonce, string> = {
  nonce: 'String!',
  type: 'NonceType!'
}

export const gqlNonce: DocumentNode = gql`
  type Nonce {
    ${getFields(gqlTypeMap)}
  }
`
