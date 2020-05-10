import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import requests from '../Requests'
import { setLoading } from './loadingSlice'

export const slice = createSlice({
  name: 'schedule',
  initialState: {
    addingStudent: false,
    editingEffectiveDate: false,
    effectiveDate: 0,
    effectiveMonth: -1,
    effectiveYear: 0,
    mutatingEffectiveDate: false,
    newEffectiveDate: 0,
    newEffectiveMonth: -1,
    newEffectiveYear: 0
  },
  reducers: {
    setAddingStudent: (state, action) => {
      state.addingStudent = action.payload
    },
    setEditingEffectiveDate: (state, action) => {
      state.editingEffectiveDate = action.payload
    },
    setEffectiveDate: (state, action) => {
      state.effectiveDate = action.payload.date
      state.effectiveMonth = action.payload.month
      state.effectiveYear = action.payload.year
    },
    setMutatingEffectiveDate: (state, action) => {
      state.mutatingEffectiveDate = action.payload
    },
    setNewEffectiveDate: (state, action) => {
      state.newEffectiveDate = action.payload.date
      state.newEffectiveMonth = action.payload.month
      state.newEffectiveYear = action.payload.year
    }
  }
})

// Actions
export const {
  setAddingStudent,
  setEditingEffectiveDate,
  setEffectiveDate,
  setMutatingEffectiveDate,
  setNewEffectiveDate
} = slice.actions

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
    dispatch(setEffectiveDate(response.data.schedule))
    dispatch(setLoading(false))
  })
}

export const mutateEffectiveDate = date => async dispatch => {
  batch(() => {
    dispatch(setEditingEffectiveDate(false))
    dispatch(setMutatingEffectiveDate(true))
  })

  const response = await requests.mutateEffectiveDate(date)

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error mutating effective date...')
    console.log(response.errors)
    return
  }

  batch(() => {
    dispatch(setEffectiveDate(date))
    dispatch(setMutatingEffectiveDate(false))
  })
}

// Selectors
export const getEffectiveDate = state => { return { date: state.schedule.effectiveDate, month: state.schedule.effectiveMonth, year: state.schedule.effectiveYear } }
export const getNewEffectiveDate = state => { return { date: state.schedule.newEffectiveDate, month: state.schedule.newEffectiveMonth, year: state.schedule.newEffectiveYear } }
export const isAddingStudent = state => state.schedule.addingStudent
export const isEditingEffectiveDate = state => state.schedule.editingEffectiveDate
export const isMutatingEffectiveDate = state => state.schedule.mutatingEffectiveDate

// Reducer
export default slice.reducer
