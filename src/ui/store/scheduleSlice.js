import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import { setLoading } from './loadingSlice'
import { sortParents } from '../../shared/libs/parent'
import { sortStudents } from '../../shared/libs/student'
import requests from '../Requests'

export const slice = createSlice({
  name: 'schedule',
  initialState: {
    addingParent: false,
    addingStudent: false,
    confirmingDeleteStudentId: 0,
    deletingStudentId: 0,
    editingEffectiveDate: false,
    editingParent: false,
    effectiveDate: 0,
    effectiveMonth: -1,
    effectiveYear: 0,
    mutatingEffectiveDate: false,
    mutatingParent: false,
    mutatingStudent: false,
    newEffectiveDate: 0,
    newEffectiveMonth: -1,
    newEffectiveYear: 0,
    parents: [],
    students: [],
    users: []
  },
  reducers: {
    addLocalParent: (state, action) => {
      state.parents = sortParents([...state.parents, action.payload.parent])
    },
    addLocalStudent: (state, action) => {
      state.students = sortStudents([...state.students, action.payload.student])
    },
    addLocalUsers: (state, action) => {
      state.users.push(...action.payload.users)
    },
    deleteLocalStudent: (state, action) => {
      const students = []
      const parents = []
      const users = []

      for (const student of state.students) {
        if (student.id !== action.payload.id) {
          students.push(student)
        }
      }

      for (const parent of state.parents) {
        if (!action.payload.deletedParentIds.includes(parent.id)) {
          parents.push(parent)
        }
      }

      for (const user of state.users) {
        if (!action.payload.deletedParentIds.includes(user.parentId)) {
          users.push(user)
        }
      }

      state.students = sortStudents(students)
      state.parents = sortParents(parents)
      state.users = users
    },
    deleteLocalUsers: (state, action) => {
      const users = []

      for (const user of state.users) {
        if (user.parentId !== action.payload.parentId) {
          users.push(user)
        }
      }

      state.users = users
    },
    setAddingParent: (state, action) => {
      state.addingParent = action.payload
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
    setEditingParent: (state, action) => {
      state.editingParent = action.payload
    },
    setEffectiveDate: (state, action) => {
      state.effectiveDate = action.payload.date
      state.effectiveMonth = action.payload.month
      state.effectiveYear = action.payload.year
    },
    setMutatingEffectiveDate: (state, action) => {
      state.mutatingEffectiveDate = action.payload
    },
    setMutatingParent: (state, action) => {
      state.mutatingParent = action.payload
    },
    setMutatingStudent: (state, action) => {
      state.mutatingStudent = action.payload
    },
    setNewEffectiveDate: (state, action) => {
      state.newEffectiveDate = action.payload.date
      state.newEffectiveMonth = action.payload.month
      state.newEffectiveYear = action.payload.year
    },
    setParents: (state, action) => {
      state.parents = sortParents(action.payload.parents)
    },
    setStudents: (state, action) => {
      state.students = sortStudents(action.payload.students)
    },
    updateLocalParent: (state, action) => {
      const parents = [action.payload.parent]

      for (const parent of state.parents) {
        if (parent.id !== action.payload.parent.id) {
          parents.push(parent)
        }
      }

      state.parents = sortParents(parents)
    }
  }
})

// Actions
export const {
  addLocalParent,
  addLocalStudent,
  addLocalUsers,
  deleteLocalStudent,
  deleteLocalUsers,
  setAddingParent,
  setAddingStudent,
  setConfirmingDeleteStudentId,
  setDeletingStudentId,
  setEditingEffectiveDate,
  setEditingParent,
  setEffectiveDate,
  setMutatingEffectiveDate,
  setMutatingParent,
  setMutatingStudent,
  setNewEffectiveDate,
  setParents,
  setStudents,
  updateLocalParent
} = slice.actions

// Thunks
export const deleteStudent = id => async dispatch => {
  dispatch(setDeletingStudentId(id))

  const response = await requests.deleteStudent(id)

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error deleting student...')
    console.log(response.errors)
    return
  }

  batch(() => {
    dispatch(deleteLocalStudent({ id, deletedParentIds: response.data.deleteStudent.deletedParentIds }))
    dispatch(setDeletingStudentId(0))
    dispatch(setConfirmingDeleteStudentId(0))
  })
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
    dispatch(setParents(response.data.fetchSchedule))
    dispatch(setStudents(response.data.fetchSchedule))
    dispatch(addLocalUsers(response.data.fetchSchedule))
    dispatch(setLoading(false))
  })
}

export const mutateParent = parent => async dispatch => {
  dispatch(setMutatingParent(true))

  const adding = !parent.id

  const response = await (adding ? requests.createParent(parent) : requests.updateParent(parent))

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error creating parent...')
    console.log(response.errors)
    return
  }

  batch(() => {
    if (adding) {
      parent.id = response.data.createParent.id

      const users = response.data.createParent.users

      for (const user of users) {
        user.parentId = parent.id
      }

      dispatch(addLocalParent({ parent }))
      dispatch(addLocalUsers({ users }))
      dispatch(setAddingParent(false))
    } else {
      const users = response.data.updateParent.users

      for (const user of users) {
        user.parentId = parent.id
      }

      dispatch(updateLocalParent({ parent }))
      dispatch(deleteLocalUsers({ parentId: parent.id }))
      dispatch(addLocalUsers({ users }))
      dispatch(setEditingParent(false))
    }

    dispatch(setMutatingParent(false))
  })
}

export const mutateStudent = student => async dispatch => {
  dispatch(setMutatingStudent(true))

  const adding = !student.id

  const response = await requests.createStudent(student)

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error mutating student...')
    console.log(response.errors)
    return
  }

  batch(() => {
    if (adding) {
      student.id = response.data.createStudent.id
      dispatch(addLocalStudent({ student }))
    }
    dispatch(setAddingStudent(false))
    dispatch(setMutatingStudent(false))
  })
}

export const updateEffectiveDate = date => async dispatch => {
  batch(() => {
    dispatch(setEditingEffectiveDate(false))
    dispatch(setMutatingEffectiveDate(true))
  })

  const response = await requests.updateEffectiveDate(date)

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
export const isConfirmingDeleteStudentId = state => state.schedule.confirmingDeleteStudentId
export const isDeletingStudentId = state => state.schedule.deletingStudentId
export const getEffectiveDate = state => { return { date: state.schedule.effectiveDate, month: state.schedule.effectiveMonth, year: state.schedule.effectiveYear } }
export const getNewEffectiveDate = state => { return { date: state.schedule.newEffectiveDate, month: state.schedule.newEffectiveMonth, year: state.schedule.newEffectiveYear } }
export const getParents = state => state.schedule.parents
export const getStudents = state => state.schedule.students
export const getUsers = state => state.schedule.users
export const isAddingParent = state => state.schedule.addingParent
export const isAddingStudent = state => state.schedule.addingStudent
export const isEditingEffectiveDate = state => state.schedule.editingEffectiveDate
export const isEditingParent = state => state.schedule.editingParent
export const isMutatingEffectiveDate = state => state.schedule.mutatingEffectiveDate
export const isMutatingParent = state => state.schedule.mutatingParent
export const isMutatingStudent = state => state.schedule.mutatingStudent

// Reducer
export default slice.reducer
