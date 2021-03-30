import { ApolloServer, gql } from 'apollo-server-micro'

import { context, Context } from '../../api/context/context'

/*
  TODO and WYLO:
    1. Break up the typeDefs like you did in that other project
    2. Replace the phony resolvers and typeDefs below with the real ones defined in `/api/resolvers` and `/api/typeDefs`
    3. Finish implementing the `isEmailAvailable()` resolver
 */

const resolvers = {
  Query: {
    users (_: undefined, __: undefined, context: Context): { name: string }[] {
      console.log(_)
      console.log(__)
      console.log(context)
      return [{ name: 'Rob' }]
    },
  },
}

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`

const apolloServer = new ApolloServer({
  context,
  resolvers,
  typeDefs
})

// Apollo Server won't work without exporting this config. It tells Next.js not to parse the body.
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
