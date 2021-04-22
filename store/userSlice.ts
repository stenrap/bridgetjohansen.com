import { batch } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as requests from '../ui/requests'
import { AppThunk, AppThunkDispatch, RootState } from './store'
import Nonce from '../shared/types/Nonce'

export interface UserState {
  admin: boolean
  email: string
  firstName: string
  id: number
  lastName: string
  nonce?: Nonce
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
  nonce: undefined,
  sendingAccountCode: false,
  studio: false,
  token: ''
}

export const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setNonce: (state: UserState, action: PayloadAction<Nonce | undefined>): void => {
      state.nonce = action.payload
    },
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
export const { setNonce, setSendingAccountCode, setUser } = slice.actions

// Thunks
export const sendAccountCode = (email: string): AppThunk => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(setSendingAccountCode(true))

  const { data, errors }: requests.NonceResponse = await requests.sendAccountCode(email)

  if (data) {
    return batch((): void => {
      console.log('data.sendAccountCode is:', data.sendAccountCode)
      dispatch(setNonce(data.sendAccountCode))
      dispatch(setSendingAccountCode(false))
    })
  }

  batch((): void => {
    const error: string = errors ? errors[0].message : 'Please check your network connection and try again.'
    console.log('error is:', error)
    dispatch(setSendingAccountCode(false))
  })
}

// Selectors
export const getNonce = (state: RootState): Nonce | undefined => state.user.nonce
export const isAdmin = (state: RootState): boolean => state.user.admin
export const isSendingAccountCode = (state: RootState): boolean => state.user.sendingAccountCode

// Reducer
export default slice.reducer
