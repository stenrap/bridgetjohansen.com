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

  getSchedule () {
    return this.fetch({
      body: {
        query: `query GetSchedule {
          schedule {
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
              lessonHour,
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

  getUser () {
    return this.fetch({
      body: {
        query: `query GetUser {
          getUser {
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
}

export default new Requests()
