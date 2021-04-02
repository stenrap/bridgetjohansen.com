import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as requests from '../ui/requests'
import { AppThunk, AppThunkDispatch, RootState } from './store'

export interface UserState {
  admin: boolean
  checkingIsEmailAvailable: boolean
  email: string
  firstName: string
  id: number
  lastName: string
  studio: boolean
  token: string
}

const initialState: UserState = {
  admin: false,
  checkingIsEmailAvailable: false,
  email: '',
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
    setCheckingIsEmailAvailable: (state: UserState, action: PayloadAction<boolean>): void => {
      state.checkingIsEmailAvailable = action.payload
    },
    setUser: (state: UserState, action: PayloadAction<UserState>): void => {
      state.admin = action.payload.admin
      state.email = action.payload.email
      // ...
    }
  }
})

// Actions
export const { setCheckingIsEmailAvailable, setUser } = slice.actions

// Thunks
export const isEmailAvailable = (email: string): AppThunk => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(setCheckingIsEmailAvailable(true))

  const response: requests.IsEmailAvailableResponse = await requests.isEmailAvailable(email)

  if (response.errors) {
    console.log('Error checking whether email is available:', response.errors[0].message)
    return
  }

  console.log('response.data?.isEmailAvailable is:', response.data?.isEmailAvailable)

  dispatch(setCheckingIsEmailAvailable(true))
}

// Selectors
export const isAdmin = (state: RootState): boolean => state.user.admin

// Reducer
export default slice.reducer
