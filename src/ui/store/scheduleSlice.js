import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import format from '../../shared/libs/format'
import requests from '../Requests'
import { setLoading } from './loadingSlice'

export const slice = createSlice({
  name: 'schedule',
  initialState: {
    date: 0,
    month: -1,
    year: 0
  },
  reducers: {
    setScheduleDate: (state, action) => {
      state.date = action.payload.date
      state.month = action.payload.month
      state.year = action.payload.year
    }
  }
})

// Actions
export const { setScheduleDate } = slice.actions

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
    dispatch(setScheduleDate(response.data.schedule))
    dispatch(setLoading(false))
  })
}

// Selectors
export const getScheduleDate = state => format.date(state.schedule.month, state.schedule.date, state.schedule.year)

// Reducer
export default slice.reducer
