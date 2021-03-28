import { ApolloServer, gql } from 'apollo-server-micro'

import { context, Context } from '../../api/context/context'

/*
  TODO and WYLO:
    0. Add a migration that creates the `users` table.
    1. Create a real resolver in `/api/resolvers` for checking whether an email is already associated with an account.
    2. Replace the phony resolvers and typeDefs below with the real ones defined in `/api/resolvers` and `/api/typeDefs`.
 */

const resolvers = {
  Query: {
    users (parent, __: undefined, context: Context): { name: string }[] {
      console.log(parent)
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
