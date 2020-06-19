const { gql } = require('apollo-server-express')

const schema = gql`
  input CreateGroupClassTimeInput {
    duration: Int!
    hour: Int!
    meridiem: String!
    minutes: Int!
    studentIds: [ID!]!
  }
  
  input CreateParentInput {
    name: String!
    phone: String!
    emails: [String!]!
  }
  
  type DeleteStudentResult {
    deletedParentIds: [ID!]!
  }
  
  type GroupClass {
    date: Int!
    id: ID!
    month: Int!
    year: Int!
  }
  
  type GroupClassTime {
    duration: Int!
    hour: Int!
    id: ID!
    meridiem: String!
    minutes: Int!
    studentIds: [ID!]!
  }
  
  type IdResult {
    id: ID!
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
    groupClasses: [GroupClass!]!
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
    createGroupClass(month: Int!, date: Int!, year: Int!): IdResult!
    createGroupClassTime(groupClassTime: CreateGroupClassTimeInput!): IdResult!
    createParent(parent: CreateParentInput!): ParentResult!
    createStudent(student: StudentInput!): IdResult!
    deleteGroupClass(id: ID!): SimpleResult!
    deleteStudent(id: ID!): DeleteStudentResult!
    signIn(googleToken: String!): User!
    signOut: SimpleResult
    updateEffectiveDate(month: Int!, date: Int!, year: Int!): SimpleResult!
    updateGroupClass(id: ID!, month: Int!, date: Int!, year: Int!): SimpleResult!
    updateParent(parent: UpdateParentInput): ParentResult!
    updateStudent(student: UpdateStudentInput): SimpleResult!
  }
  
  type Query {
    fetchSchedule: Schedule!
    fetchUser: User
  }
`

module.exports = schema
