const { gql } = require('apollo-server-express')

const schema = gql`
  input CreateParentInput {
    name: String!
    phone: String!
    emails: [String!]!
  }
  
  type DeleteStudentResult {
    deletedParentIds: [ID!]!
  }
  
  type GroupClassDate {
    date: Int!
    id: ID!
    month: Int!
    year: Int!
  }
  
  type GroupClassDateResult {
    id: ID!
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
  }
  
  type ParentResult {
    id: ID!
    users: [UserResult]!
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
    parentIds: [ID!]!
  }
  
  input StudentInput {
    lessonDay: Int!
    lessonDuration: Int!
    lessonHour: Int!
    lessonMeridiem: String!
    lessonMinutes: Int!
    name: String!
    parentIds: [ID!]!
  }
  
  type StudentResult {
    id: ID!
  }
  
  input UpdateParentInput {
    id: ID!
    name: String!
    phone: String!
    emails: [String!]!
  }
  
  input UpdateStudentInput {
    id: ID!
    lessonDay: Int!
    lessonDuration: Int!
    lessonHour: Int!
    lessonMeridiem: String!
    lessonMinutes: Int!
    name: String!
    parentIds: [ID!]!
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
    createGroupClassDate(month: Int!, date: Int!, year: Int!): GroupClassDateResult!
    createParent(parent: CreateParentInput!): ParentResult!
    createStudent(student: StudentInput!): StudentResult!
    deleteStudent(id: ID!): DeleteStudentResult!
    signIn(googleToken: String!): User!
    signOut: SimpleResult
    updateEffectiveDate(month: Int!, date: Int!, year: Int!): SimpleResult!
    updateGroupClassDate(id: ID!, month: Int!, date: Int!, year: Int!): SimpleResult!
    updateParent(parent: UpdateParentInput): ParentResult!
    updateStudent(student: UpdateStudentInput): SimpleResult!
  }
  
  type Query {
    fetchSchedule: Schedule!
    fetchUser: User
  }
`

module.exports = schema
