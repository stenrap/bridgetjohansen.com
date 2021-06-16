import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as requests from '../ui/requests'
import { AppThunk, AppThunkDispatch, RootState } from './store'
import { setUser } from './userSlice'

export interface NavState {
  requestError: string
}

const initialState: NavState = {
  requestError: ''
}

export const slice = createSlice({
  initialState,
  name: 'nav',
  reducers: {
    setRequestError: (state: NavState, action: PayloadAction<string>): void => {
      state.requestError = action.payload
    }
  }
})

// Actions
export const { setRequestError } = slice.actions

// Thunks
export const signOut = (): AppThunk => async (dispatch: AppThunkDispatch): Promise<void> => {
  dispatch(setUser({
    admin: false,
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    studio: false
  }))

  const { data, errors }: requests.SignOutResponse = await requests.signOut()

  if (!data) {
    const error: string = errors ? errors[0].message : 'Please check your network connection and try again.'
    dispatch(setRequestError(error))
  }
}

// Selectors
export const isRequestError = (state: RootState): string => state.nav.requestError

// Reducer
export default slice.reducer
