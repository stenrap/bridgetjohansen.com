import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './store'

export interface NavState {
  menuOpen: boolean
}

const initialState: NavState = {
  menuOpen: false
}

export const navSlice = createSlice({
  initialState,
  name: 'nav',
  reducers: {
    toggleMenuOpen: (state: NavState, action: PayloadAction<boolean>): void => {
      state.menuOpen = action.payload
    }
  }
})

// Actions
export const { toggleMenuOpen } = navSlice.actions

// Selectors
export const isMenuOpen = (state: RootState): boolean => state.nav.menuOpen

// Reducer
export default navSlice.reducer
