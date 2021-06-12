import { FieldNode, GraphQLResolveInfo, SelectionNode, SelectionSetNode } from 'graphql'
import { ValidationError } from 'apollo-server-micro'

import { GRAPHQL_TYPENAME_META_FIELD } from '../../constants'

/**
 * Gets the fields of a GraphQL enum from a TypeScript enum
 *
 * @param Enum The TypeScript enum whose keys should be returned
 */
export const getEnumFields = <E> (Enum: E): string => {
  return Object.keys(Enum).join('\n')
}

/**
 * Gets the fields of a GraphQL type based on a map from a model
 *
 * @param gqlTypeMap A Record type whose keys must match those of a model, and whose values must be strings
 */
export const getFields = <T> (gqlTypeMap: Record<keyof T, string>): string => {
  let fields = ''

  for (const [key, value] of Object.entries<string>(gqlTypeMap)) {
    // If the value starts with a left parenthesis, the field accepts
    // one or more arguments in addition to specifying its type. In
    // this case we simply concatenate key and value:
    //
    // postAssets(orderasc: PostAssetsOrder, first: Int): [Asset]
    // |--------||----------------------------------------------|
    //     key                        value
    //
    // Otherwise we separate key and value with a colon and a space:
    //
    // postAssetStatus: PostAssetStatus!
    // |-------------|  |--------------|
    //       key             value

    if (value.startsWith('(')) {
      fields += `${key}${value}\n`
    } else {
      fields += `${key}: ${value}\n`
    }
  }

  return fields
}

/**
 * Validates the fourth argument of resolvers that require fields to be specified,
 * then returns the SelectionSetNode representing the root of the GraphQL query.
 *
 * @param info GraphQLResolveInfo instance received as the fourth argument to a resolver
 */
export const validateGraphQLInfo = (info: GraphQLResolveInfo): SelectionSetNode => {
  const selections: ReadonlyArray<SelectionNode> = info?.operation?.selectionSet?.selections
  if (!selections || selections.length === 0) throw new ValidationError('Invalid GraphQL query')

  let query: SelectionSetNode | undefined

  // Find the root of the GraphQL query, skipping the `__typename` meta field.
  for (const node of selections as FieldNode[]) {
    if (node.name.value !== GRAPHQL_TYPENAME_META_FIELD) {
      query = node.selectionSet
      break
    }
  }

  if (!query) throw new ValidationError('Invalid GraphQL query')
  return query
}
