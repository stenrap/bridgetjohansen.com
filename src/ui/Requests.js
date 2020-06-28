import { CLIENT_NETWORK_ERROR } from '../shared/Constants'

class Requests {
  async fetch (props) {
    props.body = JSON.stringify(props.body)
    props.credentials = 'include'
    props.headers = { 'Content-Type': 'application/json' }
    props.method = 'POST'
    props.mode = 'cors'

    let response = {}

    try {
      response = await window.fetch(`${window.apiServer}/graphql`, props)
      response = await response.json()
    } catch (err) {
      response.error = CLIENT_NETWORK_ERROR
      return response
    }

    return response
  }

  createGroupClass ({ month, date, year }) {
    return this.fetch({
      body: {
        query: `mutation CreateGroupClass ($month: Int!, $date: Int!, $year: Int!) {
          createGroupClass(month: $month, date: $date, year: $year) {
            id
          }
        }`,
        variables: { month, date, year }
      }
    })
  }

  createGroupClassTime (groupClassTime) {
    return this.fetch({
      body: {
        query: `mutation CreateGroupClassTime ($groupClassTime: CreateGroupClassTimeInput!) {
          createGroupClassTime(groupClassTime: $groupClassTime) {
            id
          }
        }`,
        variables: { groupClassTime }
      }
    })
  }

  createParent (parent) {
    return this.fetch({
      body: {
        query: `mutation CreateParent ($parent: CreateParentInput!) {
          createParent(parent: $parent) {
            id,
            users {
              email,
              id
            }
          }
        }`,
        variables: { parent }
      }
    })
  }

  createStudent (student) {
    return this.fetch({
      body: {
        query: `mutation CreateStudent ($student: StudentInput!) {
          createStudent(student: $student) {
            id
          }
        }`,
        variables: { student }
      }
    })
  }

  deleteGroupClass (id) {
    return this.fetch({
      body: {
        query: `mutation DeleteGroupClass ($id: ID!) {
          deleteGroupClass(id: $id) {
            success
          }
        }`,
        variables: { id }
      }
    })
  }

  deleteGroupClassTime (id) {
    return this.fetch({
      body: {
        query: `mutation DeleteGroupClassTime ($id: ID!) {
          deleteGroupClassTime(id: $id) {
            success
          }
        }`,
        variables: { id }
      }
    })
  }

  deleteStudent (id) {
    return this.fetch({
      body: {
        query: `mutation DeleteStudent ($id: ID!) {
          deleteStudent(id: $id) {
            deletedParentIds
          }
        }`,
        variables: { id }
      }
    })
  }

  fetchSchedule () {
    return this.fetch({
      body: {
        query: `query FetchSchedule {
          fetchSchedule {
            date,
            groupClasses {
              date,
              id,
              month,
              year
            },
            groupClassTimes {
              duration,
              hour,
              id,
              meridiem,
              minutes,
              studentIds
            },
            month,
            parents {
              id,
              name,
              phone
            },
            students {
              id,
              lessonDay,
              lessonDuration,
              lessonHour,
              lessonMeridiem,
              lessonMinutes,
              name,
              parentIds
            },
            users {
              email,
              id,
              parentId
            },
            year
          }
        }`
      }
    })
  }

  fetchUser () {
    return this.fetch({
      body: {
        query: `query FetchUser {
          fetchUser {
            admin,
            email,
            id
          }
        }`
      }
    })
  }

  signIn (googleToken) {
    return this.fetch({
      body: {
        query: `mutation SignIn ($googleToken: String!) {
          signIn(googleToken: $googleToken) {
            admin,
            email,
            id
          }
        }`,
        variables: { googleToken }
      }
    })
  }

  signOut () {
    return this.fetch({
      body: {
        query: `mutation SignOut {
          signOut {
            success
          }
        }`
      }
    })
  }

  updateEffectiveDate ({ month, date, year }) {
    return this.fetch({
      body: {
        query: `mutation UpdateEffectiveDate ($month: Int!, $date: Int!, $year: Int!) {
          updateEffectiveDate(month: $month, date: $date, year: $year) {
            success
          }
        }`,
        variables: { month, date, year }
      }
    })
  }

  updateGroupClass ({ id, month, date, year }) {
    return this.fetch({
      body: {
        query: `mutation UpdateGroupClass ($id: ID!, $month: Int!, $date: Int!, $year: Int!) {
          updateGroupClass(id: $id, month: $month, date: $date, year: $year) {
            success
          }
        }`,
        variables: { id, month, date, year }
      }
    })
  }

  updateGroupClassTime (groupClassTime) {
    return this.fetch({
      body: {
        query: `mutation UpdateGroupClassTime ($groupClassTime: UpdateGroupClassTimeInput!) {
          updateGroupClassTime(groupClassTime: $groupClassTime) {
            success
          }
        }`,
        variables: { groupClassTime }
      }
    })
  }

  updateParent (parent) {
    return this.fetch({
      body: {
        query: `mutation UpdateParent ($parent: UpdateParentInput!) {
          updateParent(parent: $parent) {
            users {
              email,
              id
            }
          }
        }`,
        variables: { parent }
      }
    })
  }

  updateStudent (student) {
    return this.fetch({
      body: {
        query: `mutation UpdateStudent ($student: UpdateStudentInput!) {
          updateStudent(student: $student) {
            success
          }
        }`,
        variables: { student }
      }
    })
  }
}

export default new Requests()
