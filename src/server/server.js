'use strict'

const { ApolloServer } = require('apollo-server-express')
const cookieParser = require('cookie-parser')
const express = require('express')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const server = express()
server.disable('x-powered-by')
server.use(cookieParser())
server.use(express.json())

const apollo = new ApolloServer({
  context: ({ res }) => {
    return { res }
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

console.log(`api.bridgetjohansen.com listening on ${port}`)
