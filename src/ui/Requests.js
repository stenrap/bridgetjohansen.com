import { CLIENT_NETWORK_ERROR } from '../shared/Constants'

class Requests {
  get (props) {
    props.method = 'GET'
    return this.fetch(props)
  }

  post (props) {
    props.headers = { 'Content-Type': 'application/json' }
    props.method = 'POST'
    return this.fetch(props)
  }

  async fetch (props) {
    let response = {}

    if (props.body) {
      props.body = JSON.stringify(props.body)
    }

    try {
      props.credentials = 'include'
      props.mode = 'cors'
      response = await window.fetch(`${window.apiServer}/graphql`, props)
      response = await response.json()
    } catch (err) {
      response.error = CLIENT_NETWORK_ERROR
      return response
    }

    return response
  }

  signIn (googleToken) {
    return this.post({
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
}

export default new Requests()
