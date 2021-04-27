import { batch } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as requests from '../ui/requests'
import { AppThunk, AppThunkDispatch, RootState } from './store'
import Nonce from '../shared/types/Nonce'

export interface UserState {
  admin: boolean
  email: string
  firstName: string
  gettingAccountCode: boolean
  id: number
  lastName: string
  nonce?: Nonce
  studio: boolean
  token: string
}

const initialState: UserState = {
  admin: false,
  email: '',
  firstName: '',
  gettingAccountCode: false,
  id: 0,
  lastName: '',
  nonce: undefined,
  studio: false,
  token: ''
}

export const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setGettingAccountCode: (state: UserState, action: PayloadAction<boolean>): void => {
      state.gettingAccountCode = action.payload
    },
    setNonce: (state: UserState, action: PayloadAction<Nonce | undefined>): void => {
      state.nonce = action.payload
    },
    setUser: (state: UserState, action: PayloadAction<UserState>): void => {
      state.admin = action.payload.admin
      state.email = action.payload.email
      // ...
    }
  }
})

// Actions
export const { setGettingAccountCode, setNonce, setUser } = slice.actions

// Thunks
export const getAccountCode = (email: string): AppThunk => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(setGettingAccountCode(true))

  const { data, errors }: requests.NonceResponse = await requests.getAccountCode(email)

  if (data) {
    return batch((): void => {
      console.log('data.getAccountCode is:', data.getAccountCode)
      dispatch(setNonce(data.getAccountCode))
      dispatch(setGettingAccountCode(false))
    })
  }

  batch((): void => {
    const error: string = errors ? errors[0].message : 'Please check your network connection and try again.'
    console.log('error is:', error)
    dispatch(setGettingAccountCode(false))
  })
}

// Selectors
export const getNonce = (state: RootState): Nonce | undefined => state.user.nonce
export const isAdmin = (state: RootState): boolean => state.user.admin
export const isGettingAccountCode = (state: RootState): boolean => state.user.gettingAccountCode

// Reducer
export default slice.reducer
