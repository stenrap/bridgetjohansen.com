import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import requests from '../Requests'

export const slice = createSlice({
  name: 'user',
  initialState: {
    admin: false,
    email: '',
    id: 0,
    signedIn: false,
    signingIn: false
  },
  reducers: {
    setSigningIn: (state, action) => {
      state.signingIn = action.payload
    },
    setUser: (state, action) => {
      state.admin = action.payload.admin
      state.email = action.payload.email
      state.id = Number.parseInt(action.payload.id, 10)
      state.signedIn = true
    }
  }
})

// Actions
export const { setSigningIn, setUser } = slice.actions

// Thunks
export const signIn = googleToken => async dispatch => {
  dispatch(setSigningIn(true))

  const response = await requests.signIn(googleToken)

  if (response.errors) {
    window.gapi.auth2.getAuthInstance().signOut()
    window.location.reload()
  }

  batch(() => {
    dispatch(setUser(response.data.signIn))
    dispatch(setSigningIn(false))
  })
}

export const signOut = () => async dispatch => {
  const response = await requests.signOut()

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error signing out...')
    console.log(response.errors)
    return
  }

  window.gapi.auth2.getAuthInstance().signOut()
  window.location.reload() // Google sign in gets flaky if you don't reload. ¯\_(ツ)_/¯
}

// Selectors
export const isAdmin = state => state.user.admin
export const isSignedIn = state => state.user.signedIn
export const isSigningIn = state => state.user.signingIn

// Reducer
export default slice.reducer
