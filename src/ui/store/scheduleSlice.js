import { createSlice } from '@reduxjs/toolkit'

import { setLoading } from './loadingSlice'
import requests from '../Requests'

export const slice = createSlice({
  name: 'schedule',
  initialState: {
    date: 0,
    month: -1,
    year: 0
  },
  reducers: {
    setSchedule: (state, action) => {
      state.date = action.payload.date
      state.month = action.payload.month
      state.year = action.payload.year
    }
  }
})

// Actions
export const { setSchedule } = slice.actions

// Thunks
export const getSchedule = () => async dispatch => {
  dispatch(setLoading(true))

  const response = await requests.getSchedule()

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error fetching schedule...')
    console.log(response.errors)
    return
  }

  dispatch(setSchedule(response.data.schedule))
  dispatch(setLoading(false))
}
