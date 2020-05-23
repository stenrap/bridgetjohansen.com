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
            students {
              id,
              lessonDay,
              lessonDuration,
              lessonHour,
              lessonMeridiem,
              lessonMinutes,
              name,
              parents,
              phone,
              users {
                email,
                id
              }
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

  mutateEffectiveDate ({ month, date, year }) {
    return this.fetch({
      body: {
        query: `mutation EffectiveDate ($month: Int!, $date: Int!, $year: Int!) {
          effectiveDate(month: $month, date: $date, year: $year) {
            success
          }
        }`,
        variables: { month, date, year }
      }
    })
  }

  mutateStudent (student) {
    console.log('student is:', student)

    return this.fetch({
      body: {
        query: `mutation CreateStudent ($student: StudentInput!) {
          createStudent(student: $student) {
            id,
            users {
              email,
              id
            }
          }
        }`,
        variables: { student }
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
}

export default new Requests()
