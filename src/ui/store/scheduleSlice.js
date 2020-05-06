import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import requests from '../Requests'
import { setLoading } from './loadingSlice'

export const slice = createSlice({
  name: 'schedule',
  initialState: {
    newScheduleDate: 0,
    newScheduleMonth: -1,
    newScheduleYear: 0,
    scheduleDate: 0,
    scheduleMonth: -1,
    scheduleYear: 0
  },
  reducers: {
    setNewScheduleDate: (state, action) => {
      state.newScheduleDate = action.payload.date
      state.newScheduleMonth = action.payload.month
      state.newScheduleYear = action.payload.year
    },
    setScheduleDate: (state, action) => {
      state.scheduleDate = action.payload.date
      state.scheduleMonth = action.payload.month
      state.scheduleYear = action.payload.year
    }
  }
})

// Actions
export const { setNewScheduleDate, setScheduleDate } = slice.actions

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
    dispatch(setNewScheduleDate(response.data.schedule))
    dispatch(setScheduleDate(response.data.schedule))
    dispatch(setLoading(false))
  })
}

// Selectors
export const getNewScheduleDate = state => { return { date: state.schedule.newScheduleDate, month: state.schedule.newScheduleMonth, year: state.schedule.newScheduleYear } }
export const getScheduleDate = state => { return { date: state.schedule.scheduleDate, month: state.schedule.scheduleMonth, year: state.schedule.scheduleYear } }

// Reducer
export default slice.reducer
