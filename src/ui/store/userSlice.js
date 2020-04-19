import { createSlice } from '@reduxjs/toolkit'

import { setLoading } from './loadingSlice'
import requests from '../Requests'

export const slice = createSlice({
  name: 'user',
  initialState: {
    admin: false,
    email: '',
    id: 0,
    signedIn: false
  },
  reducers: {
    setUser: (state, action) => {
      state.admin = action.payload.admin
      state.email = action.payload.email
      state.id = Number.parseInt(action.payload.id, 10)
      state.signedIn = true
    }
  }
})

// Actions
export const { setUser } = slice.actions

// Thunks
export const signIn = googleToken => async dispatch => {
  dispatch(setLoading(true))
  const response = await requests.signIn(googleToken)

  if (response.errors) {
    window.gapi.auth2.getAuthInstance().signOut()
    window.location.reload()
  }

  dispatch(setUser(response.data.signIn))
  dispatch(setLoading(false))
}

// Selectors
export const isAdmin = state => state.user.admin
export const isSignedIn = state => state.user.signedIn

// Reducer
export default slice.reducer
