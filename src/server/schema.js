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
  
  type Parent {
    id: ID!
    name: String!
    phone: String!
    users: [ParentUser!]!
  }
  
  type Schedule {
    date: Int!
    groupClassDates: [GroupClassDate!]!
    groupClassTimes: [GroupClassTime!]!
    month: Int!
    // TODO and WYLO 1 .... Add the parents here (and update the definition of Parent)
    students: [Student!]!
    // TODO and WYLO 2 .... Add the users here (and update the definition of ParentUser)
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
    lessonMeridiem: String!
    lessonMinutes: Int!
    name: String!
    users: [Parent!]!
  }
  
  input StudentInput {
    lessonDay: Int!
    lessonDuration: Int!
    lessonHour: Int!
    lessonMeridiem: String!
    lessonMinutes: Int!
    name: String!
    parents: String!
    phone: String!
    emails: [String!]!
  }
  
  type StudentResult {
    id: ID!
    users: [UserResult!]!
  }
  
  type ParentUser {
    email: String!
    id: ID!
  }
  
  type User {
    admin: Boolean!
    email: String!
    id: ID!
  }
  
  type UserResult {
    email: String!
    id: ID!
  }
  
  type Mutation {
    createStudent(student: StudentInput!): Student!
    deleteStudent(id: ID!): SimpleResult!
    signIn(googleToken: String!): User!
    signOut: SimpleResult
    updateEffectiveDate(month: Int!, date: Int!, year: Int!): SimpleResult
  }
  
  type Query {
    fetchSchedule: Schedule!
    fetchUser: User
  }
`

module.exports = schema
