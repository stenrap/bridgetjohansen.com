import { createSlice } from '@reduxjs/toolkit'

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

// Selectors
export const isAdmin = state => state.user.admin
export const isAuthenticated = state => state.user.authenticated

// Reducer
export default slice.reducer
