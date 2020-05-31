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

  createParent (parent) {
    return this.fetch({
      body: {
        query: `mutation CreateParent ($parent: ParentInput!) {
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

  deleteStudent (id) {
    return this.fetch({
      body: {
        query: `mutation DeleteStudent ($id: ID!) {
          deleteStudent(id: $id) {
            success
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
            groupClassDates {
              date,
              id,
              month,
              year
            },
            groupClassTimes {
              hour,
              id,
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
}

export default new Requests()
