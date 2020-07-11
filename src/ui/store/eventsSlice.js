import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import { sortEvents } from '../../shared/libs/event'
import requests from '../Requests'

export const slice = createSlice({
  name: 'events',
  initialState: {
    addingEvent: false,
    events: [],
    mutatingEvent: false
  },
  reducers: {
    addLocalEvent: (state, action) => {
      state.events.push(action.payload.event)
      state.events = sortEvents(state.events)
    },
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
  addLocalEvent,
  setAddingEvent,
  setMutatingEvent
} = slice.actions

// Thunks
export const mutateEvent = event => async dispatch => {
  dispatch(setMutatingEvent(true))

  const adding = !event.id

  const response = await requests.createEvent(event)

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error mutating event...')
    console.log(response.errors)
    return
  }

  batch(() => {
    if (adding) {
      event.expiration = parseInt(event.expiration, 10)
      event.id = response.data.createEvent.id
      dispatch(addLocalEvent({ event }))
    }

    dispatch(setAddingEvent(false))
    dispatch(setMutatingEvent(false))
  })
}

// Selectors
export const isAddingEvent = state => state.events.addingEvent
export const isMutatingEvent = state => state.events.mutatingEvent

export default slice.reducer
