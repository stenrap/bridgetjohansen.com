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
    studentId: ID!
  }

  type ParentUser {
    email: String!
    id: ID!
    parentId: ID!
  }
  
  type Schedule {
    date: Int!
    groupClassDates: [GroupClassDate!]!
    groupClassTimes: [GroupClassTime!]!
    month: Int!
    parents: [Parent!]!
    students: [Student!]!
    users: [ParentUser!]!
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
