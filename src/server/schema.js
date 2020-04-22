const { gql } = require('apollo-server-express')

const schema = gql`
  type GroupClassDate {
    date: Int!
    id: ID!
    month: Int!
    year: Int!
  }
  
  type GroupClassTime {
    hour: Int!
    id: ID!
    minutes: Int!
    studentIds: [Int!]!
  }
  
  type Mutation {
    signIn(googleToken: String!): User!
  }
  
  type Query {
    schedule: Schedule!
  }
  
  type Schedule {
    date: Int!
    groupClassDates: [GroupClassDate!]!
    groupClassTimes: [GroupClassTime!]!
    month: Int!
    students: [Student!]!
    year: Int!
  }
  
  type StudentUser {
    email: String!
    id: ID!
  }
  
  type Student {
    id: ID!
    lessonDay: Int!
    lessonDuration: Int!
    lessonHour: Int!
    lessonMinutes: Int!
    name: String!
    parents: String!
    phone: String!
    users: [StudentUser!]!
  }
  
  type User {
    admin: Boolean!
    email: String!
    id: ID!
  }
`

module.exports = schema
