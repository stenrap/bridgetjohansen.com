import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import { setLoading } from './loadingSlice'
import { sortStudents } from '../../shared/libs/student'
import requests from '../Requests'

export const slice = createSlice({
  name: 'schedule',
  initialState: {
    addingStudent: false,
    confirmingDeleteStudentId: 0,
    deletingStudentId: 0,
    editingEffectiveDate: false,
    effectiveDate: 0,
    effectiveMonth: -1,
    effectiveYear: 0,
    mutatingEffectiveDate: false,
    mutatingStudent: false,
    newEffectiveDate: 0,
    newEffectiveMonth: -1,
    newEffectiveYear: 0,
    students: []
  },
  reducers: {
    addStudent: (state, action) => {
      state.students = sortStudents([...state.students, action.payload.student])
    },
    setAddingStudent: (state, action) => {
      state.addingStudent = action.payload
    },
    setConfirmingDeleteStudentId: (state, action) => {
      state.confirmingDeleteStudentId = action.payload
    },
    setDeletingStudentId: (state, action) => {
      state.deletingStudentId = action.payload
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
    setMutatingStudent: (state, action) => {
      state.mutatingStudent = action.payload
    },
    setNewEffectiveDate: (state, action) => {
      state.newEffectiveDate = action.payload.date
      state.newEffectiveMonth = action.payload.month
      state.newEffectiveYear = action.payload.year
    },
    setStudents: (state, action) => {
      state.students = sortStudents(action.payload.students)
    }
  }
})

// Actions
export const {
  addStudent,
  setAddingStudent,
  setConfirmingDeleteStudentId,
  setDeletingStudentId,
  setEditingEffectiveDate,
  setEffectiveDate,
  setMutatingEffectiveDate,
  setMutatingStudent,
  setNewEffectiveDate,
  setStudents
} = slice.actions

// Thunks
export const deleteStudent = () => async dispatch => {

}

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
    dispatch(setEffectiveDate(response.data.fetchSchedule))
    dispatch(setNewEffectiveDate(response.data.fetchSchedule))
    dispatch(setStudents(response.data.fetchSchedule))
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

export const mutateStudent = student => async dispatch => {
  dispatch(setMutatingStudent(true))

  const response = await requests.mutateStudent(student)

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error mutating student...')
    console.log(response.errors)
    return
  }

  const adding = !student.id

  if (adding) {
    student.id = response.data.createStudent.id
    student.users = response.data.createStudent.users
  }

  batch(() => {
    if (adding) {
      dispatch(addStudent({ student }))
    }
    dispatch(setAddingStudent(false))
    dispatch(setMutatingStudent(false))
  })
}

// Selectors
export const isConfirmingDeleteStudentId = state => state.schedule.confirmingDeleteStudentId
export const isDeletingStudentId = state => state.schedule.deletingStudentId
export const getEffectiveDate = state => { return { date: state.schedule.effectiveDate, month: state.schedule.effectiveMonth, year: state.schedule.effectiveYear } }
export const getNewEffectiveDate = state => { return { date: state.schedule.newEffectiveDate, month: state.schedule.newEffectiveMonth, year: state.schedule.newEffectiveYear } }
export const getStudents = state => state.schedule.students
export const isAddingStudent = state => state.schedule.addingStudent
export const isEditingEffectiveDate = state => state.schedule.editingEffectiveDate
export const isMutatingEffectiveDate = state => state.schedule.mutatingEffectiveDate
export const isMutatingStudent = state => state.schedule.mutatingStudent

// Reducer
export default slice.reducer
