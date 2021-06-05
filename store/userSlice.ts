import { batch } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as requests from '../ui/requests'
import { AppThunk, AppThunkDispatch, RootState } from './store'
import CreateAccountInput from '../shared/types/CreateAccountInput'
import Nonce from '../shared/types/Nonce'
import User from '../data/models/user/User'

export interface UserState {
  accountCreated: boolean
  admin: boolean
  creatingAccount: boolean
  email: string
  firstName: string
  gettingAccountCode: boolean
  id: number
  lastName: string
  nonce?: Nonce
  studio: boolean
}

const initialState: UserState = {
  accountCreated: false,
  admin: false,
  creatingAccount: false,
  email: '',
  firstName: '',
  gettingAccountCode: false,
  id: 0,
  lastName: '',
  nonce: undefined,
  studio: false,
}

export const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setAccountCreated: (state: UserState, action: PayloadAction<boolean>): void => {
      state.accountCreated = action.payload
    },
    setCreatingAccount: (state: UserState, action: PayloadAction<boolean>): void => {
      state.creatingAccount = action.payload
    },
    setGettingAccountCode: (state: UserState, action: PayloadAction<boolean>): void => {
      state.gettingAccountCode = action.payload
    },
    setNonce: (state: UserState, action: PayloadAction<Nonce | undefined>): void => {
      state.nonce = action.payload
    },
    setUser: (state: UserState, action: PayloadAction<Omit<User, 'created' | 'lastLogin' | 'token'>>): void => {
      state.admin = action.payload.admin
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.id = action.payload.id
      state.lastName = action.payload.lastName
      state.studio = action.payload.studio
    }
  }
})

// Actions
export const { setAccountCreated, setCreatingAccount, setGettingAccountCode, setNonce, setUser } = slice.actions

// Thunks
export const createAccount = (account: CreateAccountInput): AppThunk => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(setCreatingAccount(true))

  const { data, errors }: requests.CreateAccountResponse = await requests.createAccount(account)

  if (data) {
    return batch((): void => {
      dispatch(setCreatingAccount(false))
      dispatch(setUser({
        admin: false,
        email: account.email,
        firstName: account.firstName,
        id: data.createAccount,
        lastName: account.lastName,
        studio: false
      }))
      dispatch(setAccountCreated(true))
    })
  }

  batch((): void => {
    const error: string = errors ? errors[0].message : 'Please check your network connection and try again.'
    // TODO .... Show this error in a modal:
    console.log('error is:', error)
    dispatch(setCreatingAccount(false))
  })
}

export const getAccountCode = (email: string): AppThunk => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(setGettingAccountCode(true))

  const { data, errors }: requests.NonceResponse = await requests.getAccountCode(email)

  if (data) {
    return batch((): void => {
      dispatch(setNonce(data.getAccountCode))
      dispatch(setGettingAccountCode(false))
    })
  }

  batch((): void => {
    const error: string = errors ? errors[0].message : 'Please check your network connection and try again.'
    // TODO .... Show this error in a modal:
    console.log('error is:', error)
    dispatch(setGettingAccountCode(false))
  })
}

// Selectors
export const getNonce = (state: RootState): Nonce | undefined => state.user.nonce
export const isAccountCreated = (state: RootState): boolean => state.user.accountCreated
export const isAdmin = (state: RootState): boolean => state.user.admin
export const isCreatingAccount = (state: RootState): boolean => state.user.creatingAccount
export const isGettingAccountCode = (state: RootState): boolean => state.user.gettingAccountCode

// Reducer
export default slice.reducer
