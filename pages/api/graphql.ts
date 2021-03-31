import { ApolloServer } from 'apollo-server-micro'

import { context } from '../../api/context/context'
import resolvers from '../../api/resolvers/resolvers'
import typeDefs from '../../api/typedefs/typeDefs'

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
