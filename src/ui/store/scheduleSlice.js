import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import requests from '../Requests'
import { setLoading } from './loadingSlice'

export const slice = createSlice({
  name: 'schedule',
  initialState: {
    effectiveDate: 0,
    effectiveDateModalOpen: false,
    effectiveMonth: -1,
    effectiveYear: 0,
    mutatingEffectiveDate: false,
    newEffectiveDate: 0,
    newEffectiveMonth: -1,
    newEffectiveYear: 0
  },
  reducers: {
    setMutatingScheduleDate: (state, action) => {
      state.mutatingEffectiveDate = action.payload
    },
    setNewEffectiveDate: (state, action) => {
      state.newEffectiveDate = action.payload.date
      state.newEffectiveMonth = action.payload.month
      state.newEffectiveYear = action.payload.year
    },
    setScheduleDate: (state, action) => {
      state.effectiveDate = action.payload.date
      state.effectiveMonth = action.payload.month
      state.effectiveYear = action.payload.year
    },
    setEffectiveDateModalOpen: (state, action) => {
      state.effectiveDateModalOpen = action.payload
    }
  }
})

// Actions
export const { setMutatingScheduleDate, setNewEffectiveDate, setScheduleDate, setEffectiveDateModalOpen } = slice.actions

// Thunks
export const fetchSchedule = () => async dispatch => {
  dispatch(setLoading(true))

  const response = await requests.fetchSchedule()

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error fetching schedule...')
    console.log(response.errors)
    return
  }

  batch(() => {
    dispatch(setNewEffectiveDate(response.data.schedule))
    dispatch(setScheduleDate(response.data.schedule))
    dispatch(setLoading(false))
  })
}

export const mutateEffectiveDate = date => async dispatch => {
  batch(() => {
    dispatch(setEffectiveDateModalOpen(false))
    dispatch(setMutatingScheduleDate(true))
  })

  const response = await requests.mutateEffectiveDate(date)

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error mutating effective date...')
    console.log(response.errors)
    return
  }

  batch(() => {
    dispatch(setScheduleDate(date))
    dispatch(setMutatingScheduleDate(false))
  })
}

// Selectors
export const getEffectiveDate = state => { return { date: state.schedule.effectiveDate, month: state.schedule.effectiveMonth, year: state.schedule.effectiveYear } }
export const getNewEffectiveDate = state => { return { date: state.schedule.newEffectiveDate, month: state.schedule.newEffectiveMonth, year: state.schedule.newEffectiveYear } }
export const isEffectiveDateModalOpen = state => state.schedule.effectiveDateModalOpen
export const isMutatingEffectiveDate = state => state.schedule.mutatingEffectiveDate

// Reducer
export default slice.reducer
