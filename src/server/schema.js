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
  
  type Event {
    dateAndTime: String!
    expiration: String!
    id: ID!
    location: String!
    name: String!
  }
  
  input EventInput {
    dateAndTime: String!
    expiration: String!
    location: String!
    name: String!
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
  
  type SuccessResult {
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
  
  input UpdateEventInput {
    dateAndTime: String!
    expiration: String!
    id: ID!
    location: String!
    name: String!
  }
  
  input UpdateGroupClassTimeInput {
    id: ID!
    duration: Int!
    hour: Int!
    meridiem: String!
    minutes: Int!
    studentIds: [ID!]!
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
    createEvent(event: EventInput!): IdResult!
    createGroupClass(month: Int!, date: Int!, year: Int!): IdResult!
    createGroupClassTime(groupClassTime: CreateGroupClassTimeInput!): IdResult!
    createParent(parent: CreateParentInput!): ParentResult!
    createStudent(student: StudentInput!): IdResult!
    deleteEvent(id: ID!): SuccessResult!
    deleteGroupClass(id: ID!): SuccessResult!
    deleteGroupClassTime(id: ID!): SuccessResult!
    deleteStudent(id: ID!): DeleteStudentResult!
    signIn(googleToken: String!): User!
    signOut: SuccessResult
    updateEffectiveDate(month: Int!, date: Int!, year: Int!): SuccessResult!
    updateEvent(event: UpdateEventInput!): SuccessResult!
    updateGroupClass(id: ID!, month: Int!, date: Int!, year: Int!): SuccessResult!
    updateGroupClassTime(groupClassTime: UpdateGroupClassTimeInput!): SuccessResult!
    updateParent(parent: UpdateParentInput): ParentResult!
    updateStudent(student: UpdateStudentInput): SuccessResult!
  }
  
  type Query {
    fetchEvents: [Event!]!
    fetchSchedule: Schedule!
    fetchUser: User
  }
`

module.exports = schema
