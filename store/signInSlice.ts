import { batch } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as requests from '../ui/requests'
import { AppThunk, AppThunkDispatch, RootState } from './store'
import { setUser } from './userSlice'
import SignInInput from '../shared/types/SignInInput'

export interface SignInState {
  requestError: string
  signingIn: boolean
}

const initialState: SignInState = {
  requestError: '',
  signingIn: false
}

export const slice = createSlice({
  initialState,
  name: 'signIn',
  reducers: {
    setRequestError: (state: SignInState, action: PayloadAction<string>): void => {
      state.requestError = action.payload
    },
    setSigningIn: (state: SignInState, action: PayloadAction<boolean>): void => {
      state.signingIn = action.payload
    }
  }
})

// Actions
export const { setRequestError, setSigningIn } = slice.actions

// Thunks
export const signIn = (credentials: SignInInput): AppThunk => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(setSigningIn(true))

  const { data, errors }: requests.SignInResponse = await requests.signIn(credentials)

  if (data) {
    return batch((): void => {
      dispatch(setSigningIn(false))
      dispatch(setUser(data.signIn))
    })
  }

  batch((): void => {
    const error: string = errors ? errors[0].message : 'Please check your network connection and try again.'
    dispatch(setSigningIn(false))
    dispatch(setRequestError(error))
  })
}

// Selectors
export const isRequestError = (state: RootState): string => state.signIn.requestError
export const isSigningIn = (state: RootState): boolean => state.signIn.signingIn

// Reducer
export default slice.reducer
