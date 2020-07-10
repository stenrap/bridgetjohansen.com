import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'events',
  initialState: {
    addingEvent: false,
    mutatingEvent: false
  },
  reducers: {
    setAddingEvent: (state, action) => {
      state.addingEvent = action.payload
    },
    setMutatingEvent: (state, action) => {
      state.mutatingEvent = action.payload
    }
  }
})

// Actions
export const {
  setAddingEvent,
  setMutatingEvent
} = slice.actions

// Thunks
export const mutateEvent = event => async dispatch => {
  dispatch(setMutatingEvent(true))
}

// Selectors
export const isAddingEvent = state => state.events.addingEvent
export const isMutatingEvent = state => state.events.mutatingEvent

export default slice.reducer
