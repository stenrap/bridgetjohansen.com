import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import { sortEvents } from '../../shared/libs/event'
import requests from '../Requests'

export const slice = createSlice({
  name: 'events',
  initialState: {
    addingEvent: false,
    editingEventId: 0,
    events: [],
    fetched: false,
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
    setEditingEventId: (state, action) => {
      state.editingEventId = action.payload
    },
    setFetched: (state, action) => {
      state.fetched = action.payload
    },
    setLocalEvents: (state, action) => {
      for (const event of action.payload) {
        event.expiration = parseInt(event.expiration, 10)
      }
      state.events = sortEvents(action.payload)
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
  setEditingEventId,
  setFetched,
  setLocalEvents,
  setMutatingEvent
} = slice.actions

// Thunks
export const fetchEvents = () => async dispatch => {
  const response = await requests.fetchEvents()

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error fetching events...')
    console.log(response.errors)
    return
  }

  batch(() => {
    dispatch(setLocalEvents(response.data.fetchEvents))
    dispatch(setFetched(true))
  })
}

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
export const getEvents = state => state.events.events
export const isAddingEvent = state => state.events.addingEvent
export const isEditingEventId = state => state.events.editingEventId
export const isFetched = state => state.events.fetched
export const isMutatingEvent = state => state.events.mutatingEvent

export default slice.reducer
