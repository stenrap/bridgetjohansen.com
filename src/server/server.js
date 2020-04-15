'use strict'

const { ApolloServer } = require('apollo-server-express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const port = process.env.PORT || 4000

const server = express()

const apollo = new ApolloServer({ typeDefs, resolvers })
apollo.applyMiddleware({ app: server })

server.disable('x-powered-by')
server.use(cookieParser())
server.use(cors({
  credentials: true,
  methods: ['GET', 'POST'],
  origin: process.env.PIANO_CORS_ORIGIN
}))
server.use(express.json())

server.listen(port)

console.log(`local-api.bridgetjohansen.com listening on ${port}`)
