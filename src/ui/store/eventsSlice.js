import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'events',
  initialState: {
    addingEvent: false
  },
  reducers: {
    setAddingEvent: (state, action) => {
      state.addingEvent = action.payload
    }
  }
})

// Actions
export const {
  setAddingEvent
} = slice.actions

// Thunks

// Selectors
export const isAddingEvent = state => state.events.addingEvent

export default slice.reducer
