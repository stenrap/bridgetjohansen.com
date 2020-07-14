import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import { sortEvents } from '../../shared/libs/event'
import requests from '../Requests'

export const slice = createSlice({
  name: 'events',
  initialState: {
    addingEvent: false,
    confirmingDeleteEventId: 0,
    deletingEventId: 0,
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
    setConfirmingDeleteEventId: (state, action) => {
      state.confirmingDeleteEventId = action.payload
    },
    setDeletingEventId: (state, action) => {
      state.deletingEventId = action.payload
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
    },
    updateLocalEvent: (state, action) => {
      const events = [action.payload.event]

      for (const event of state.events) {
        if (event.id !== action.payload.event.id) {
          events.push(event)
        }
      }

      state.events = sortEvents(events)
    }
  }
})

// Actions
export const {
  addLocalEvent,
  setAddingEvent,
  setConfirmingDeleteEventId,
  setDeletingEventId,
  setEditingEventId,
  setFetched,
  setLocalEvents,
  setMutatingEvent,
  updateLocalEvent
} = slice.actions

// Thunks
export const deleteEvent = id => async dispatch => {
  dispatch(setDeletingEventId(id))
}

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

  const response = await (adding ? requests.createEvent(event) : requests.updateEvent(event))

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error mutating event...')
    console.log(response.errors)
    return
  }

  event.expiration = parseInt(event.expiration, 10)

  batch(() => {
    if (adding) {
      event.id = response.data.createEvent.id
      dispatch(addLocalEvent({ event }))
      dispatch(setAddingEvent(false))
    } else {
      dispatch(updateLocalEvent({ event }))
      dispatch(setEditingEventId(0))
    }

    dispatch(setMutatingEvent(false))
  })
}

// Selectors
export const getEvents = state => state.events.events
export const isAddingEvent = state => state.events.addingEvent
export const isConfirmingDeleteEventId = state => state.events.confirmingDeleteEventId
export const isDeletingEventId = state => state.events.deletingEventId
export const isEditingEventId = state => state.events.editingEventId
export const isFetched = state => state.events.fetched
export const isMutatingEvent = state => state.events.mutatingEvent

export default slice.reducer
