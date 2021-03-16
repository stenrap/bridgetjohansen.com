import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import express from 'express'

import { context } from './context/context'
import logger from './logger'
import resolvers from './resolvers/resolvers'
import typeDefs from './typedefs/typedefs'

const server = express()
server.disable('x-powered-by')
server.use(cookieParser())
server.use(express.json())

const apollo = new ApolloServer({
  context,
  resolvers,
  typeDefs
})

apollo.applyMiddleware({
  app: server,
  bodyParserConfig: true,
  cors: {
    methods: ['POST'],
    origin: process.env.PIANO_CORS_ORIGIN
  }
})

const port = process.env.PIANO_SERVER_PORT
server.listen(port)
logger.info(`api.bridgetjohansen.com listening on ${port}`)
