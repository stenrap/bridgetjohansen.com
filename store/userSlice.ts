import { batch } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as requests from '../ui/requests'
import { AppThunk, AppThunkDispatch, RootState } from './store'

export interface UserState {
  admin: boolean
  checkingEmail: boolean
  email: string
  emailAvailable: boolean
  emailError: string
  firstName: string
  id: number
  lastName: string
  studio: boolean
  token: string
}

const initialState: UserState = {
  admin: false,
  checkingEmail: false,
  email: '',
  emailAvailable: false,
  emailError: '',
  firstName: '',
  id: 0,
  lastName: '',
  studio: false,
  token: ''
}

export const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setCheckingEmail: (state: UserState, action: PayloadAction<boolean>): void => {
      state.checkingEmail = action.payload
    },
    setEmailAvailable: (state: UserState, action: PayloadAction<boolean>): void => {
      state.emailAvailable = action.payload
    },
    setEmailError: (state: UserState, action: PayloadAction<string>): void => {
      state.emailError = action.payload
    },
    setUser: (state: UserState, action: PayloadAction<UserState>): void => {
      state.admin = action.payload.admin
      state.email = action.payload.email
      // ...
    }
  }
})

// Actions
export const { setCheckingEmail, setEmailAvailable, setEmailError, setUser } = slice.actions

// Thunks
export const checkEmail = (email: string): AppThunk => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(setCheckingEmail(true))

  const response: requests.IsEmailAvailableResponse = await requests.isEmailAvailable(email)

  if (response.errors) {
    const error: string = response.errors[0].message
    console.log('Error checking whether email is available:', response.errors[0].message)
    return batch((): void => {
      dispatch(setEmailAvailable(false))
      dispatch(setEmailError(error))
      dispatch(setCheckingEmail(false))
    })
  }

  batch((): void => {
    console.log('response.data?.isEmailAvailable is:', response.data?.isEmailAvailable)
    dispatch(setEmailAvailable(Boolean(response.data?.isEmailAvailable)))
    dispatch(setCheckingEmail(false))
  })
}

// Selectors
export const getEmailError = (state: RootState): string => state.user.emailError
export const isAdmin = (state: RootState): boolean => state.user.admin
export const isCheckingEmail = (state: RootState): boolean => state.user.checkingEmail
export const isEmailAvailable = (state: RootState): boolean => state.user.emailAvailable

// Reducer
export default slice.reducer
