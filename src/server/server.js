'use strict'

const { ApolloServer } = require('apollo-server-express')
const cookieParser = require('cookie-parser')

const { TOKEN_COOKIE } = require('../shared/Constants')
const express = require('express')
const logger = require('./Logger')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const userDao = require('./daos/UserDao')

const server = express()
server.disable('x-powered-by')
server.use(cookieParser())
server.use(express.json())

const apollo = new ApolloServer({
  context: async ({ req, res }) => {
    const token = req.cookies[TOKEN_COOKIE]

    let user = null

    if (token) {
      try {
        user = await userDao.getUser(token)
      } catch (err) {
        logger.error('Error getting user for Apollo context')
        logger.error(err)
      }
    }

    return { req, res, user }
  },
  resolvers,
  typeDefs
})

apollo.applyMiddleware({
  app: server,
  bodyParserConfig: true,
  cors: {
    credentials: true,
    methods: ['GET', 'POST'],
    origin: process.env.PIANO_CORS_ORIGIN
  }
})

const port = process.env.PORT || 4000

server.listen(port)

logger.info(`api.bridgetjohansen.com listening on ${port}`)
