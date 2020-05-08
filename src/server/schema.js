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
  
  type Schedule {
    date: Int!
    groupClassDates: [GroupClassDate!]!
    groupClassTimes: [GroupClassTime!]!
    month: Int!
    students: [Student!]!
    year: Int!
  }
  
  type SimpleResult {
    success: Boolean
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
  
  type StudentUser {
    email: String!
    id: ID!
  }
  
  type User {
    admin: Boolean!
    email: String!
    id: ID!
  }
  
  type Mutation {
    effectiveDate(month: Int!, date: Int!, year: Int!): SimpleResult
    signIn(googleToken: String!): User!
    signOut: SimpleResult
  }
  
  type Query {
    schedule: Schedule!
    getUser: User
  }
`

module.exports = schema
