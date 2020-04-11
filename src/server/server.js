'use strict'

const { buildSchema } = require('graphql')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const graphqlHTTP = require('express-graphql')

const port = process.env.PORT || 4000

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    ip: String
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  ip: function (args, req) {
    return req.ip
  }
}

const server = express()
server.disable('x-powered-by')
server.use(cookieParser())
server.use(cors({
  credentials: true,
  methods: ['GET', 'POST'],
  origin: process.env.PIANO_CORS_ORIGIN
}))
server.use(express.json())

server.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: process.env.NODE_ENV === 'development'
}))

server.listen(port)

console.log('local-api.bridgetjohansen.com listening on 4000')
