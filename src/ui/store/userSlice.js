import { createSlice } from '@reduxjs/toolkit'

import requests from '../Requests'

export const slice = createSlice({
  name: 'user',
  initialState: {
    admin: false,
    authenticated: false
  },
  reducers: {
    signIn: (state, action) => {
      state.admin = action.payload.admin
      state.authenticated = true
    }
  }
})

// Actions
export const { signIn } = slice.actions

// Thunks
export const authenticate = googleToken => async dispatch => {
  const response = await requests.authenticate(googleToken)
  console.log('The response is:', response)
}

// Selectors
export const isAdmin = state => state.user.admin
export const isAuthenticated = state => state.user.authenticated

// Reducer
export default slice.reducer
