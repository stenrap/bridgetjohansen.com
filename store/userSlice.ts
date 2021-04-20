import { batch } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as requests from '../ui/requests'
import { AppThunk, AppThunkDispatch, RootState } from './store'

export interface UserState {
  admin: boolean
  email: string
  firstName: string
  id: number
  lastName: string
  sendingAccountCode: boolean
  studio: boolean
  token: string
}

const initialState: UserState = {
  admin: false,
  email: '',
  firstName: '',
  id: 0,
  lastName: '',
  sendingAccountCode: false,
  studio: false,
  token: ''
}

export const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setSendingAccountCode: (state: UserState, action: PayloadAction<boolean>): void => {
      state.sendingAccountCode = action.payload
    },
    setUser: (state: UserState, action: PayloadAction<UserState>): void => {
      state.admin = action.payload.admin
      state.email = action.payload.email
      // ...
    }
  }
})

// Actions
export const { setSendingAccountCode, setUser } = slice.actions

// Thunks
export const sendAccountCode = (email: string): AppThunk => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(setSendingAccountCode(true))

  const response: requests.NonceResponse = await requests.sendAccountCode(email)

  if (response.errors) {
    console.log('Error sending account code:', response.errors[0].message)
    return batch((): void => {
      dispatch(setSendingAccountCode(false))
    })
  }

  batch((): void => {
    console.log('response.data?.sendAccountCode is:', response.data?.sendAccountCode)
    dispatch(setSendingAccountCode(false))
  })
}

// Selectors
export const isAdmin = (state: RootState): boolean => state.user.admin
export const isSendingAccountCode = (state: RootState): boolean => state.user.sendingAccountCode

// Reducer
export default slice.reducer
