import { createSlice } from '@reduxjs/toolkit'

import { setLoading } from './loadingSlice'
import requests from '../Requests'

export const slice = createSlice({
  name: 'user',
  initialState: {
    admin: false,
    authenticated: false,
    email: '',
    id: 0
  },
  reducers: {
    setUser: (state, action) => {
      state.admin = action.payload.admin
      state.authenticated = true
      state.email = action.payload.email
      state.id = Number.parseInt(action.payload.id, 10)
    }
  }
})

// Actions
export const { setUser } = slice.actions

// Thunks
export const authenticate = googleToken => async dispatch => {
  dispatch(setLoading(true))
  const response = await requests.authenticate(googleToken)

  if (response.errors) {
    window.gapi.auth2.getAuthInstance().signOut()
    window.location.reload()
  }

  dispatch(setUser(response.data.authenticate))
  dispatch(setLoading(false))
}

// Selectors
export const isAdmin = state => state.user.admin
export const isAuthenticated = state => state.user.authenticated

// Reducer
export default slice.reducer
