import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import navReducer from './navSlice'
import signInReducer from './signInSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    nav: navReducer,
    signIn: signInReducer,
    user: userReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action<unknown>>
export default store
