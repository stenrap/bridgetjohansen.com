import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import { setLoading } from './loadingSlice'
import { sortParents } from '../../shared/libs/parent'
import { sortStudents } from '../../shared/libs/student'
import requests from '../Requests'

export const slice = createSlice({
  name: 'schedule',
  initialState: {
    addingGroupClassDate: false,
    addingParent: false,
    addingStudent: false,
    confirmingDeleteStudentId: 0,
    creatingGroupClassDate: false,
    deletingStudentId: 0,
    editingEffectiveDate: false,
    editingParentId: 0,
    editingParentOfStudentId: 0,
    editingStudentId: 0,
    effectiveDate: 0,
    effectiveMonth: -1,
    effectiveYear: 0,
    mutatingEffectiveDate: false,
    mutatingParent: false,
    mutatingStudent: false,
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
    setAddingGroupClassDate: (state, action) => {
      state.addingGroupClassDate = action.payload
    },
    setAddingStudent: (state, action) => {
      state.addingStudent = action.payload
    },
    setConfirmingDeleteStudentId: (state, action) => {
      state.confirmingDeleteStudentId = action.payload
    },
    setCreatingGroupClassDate: (state, action) => {
      state.creatingGroupClassDate = action.payload
    },
    setDeletingStudentId: (state, action) => {
      state.deletingStudentId = action.payload
    },
    setEditingEffectiveDate: (state, action) => {
      state.editingEffectiveDate = action.payload
    },
    setEditingParentId: (state, action) => {
      state.editingParentId = action.payload
    },
    setEditingParentOfStudentId: (state, action) => {
      state.editingParentOfStudentId = action.payload
    },
    setEditingStudentId: (state, action) => {
      state.editingStudentId = action.payload
    },
    setLocalEffectiveDate: (state, action) => {
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
    },
    updateLocalStudent: (state, action) => {
      const students = [action.payload.student]

      for (const student of state.students) {
        if (student.id !== action.payload.student.id) {
          students.push(student)
        }
      }

      state.students = sortStudents(students)
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
  setAddingGroupClassDate,
  setAddingParent,
  setAddingStudent,
  setConfirmingDeleteStudentId,
  setCreatingGroupClassDate,
  setDeletingStudentId,
  setEditingEffectiveDate,
  setEditingParentId,
  setEditingParentOfStudentId,
  setEditingStudentId,
  setLocalEffectiveDate,
  setMutatingEffectiveDate,
  setMutatingParent,
  setMutatingStudent,
  setParents,
  setStudents,
  updateLocalParent,
  updateLocalStudent
} = slice.actions

// Thunks
export const createGroupClassDate = date => async dispatch => {
  batch(() => {
    dispatch(setAddingGroupClassDate(false))
    dispatch(setCreatingGroupClassDate(true))
  })

  // const response = await requests.createGroupClassDate(date)

  // if (response.errors) {
  //   // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
  //   console.log('Error adding group class date...')
  //   console.log(response.errors)
  //   return
  // }

  batch(() => {
    // dispatch(addLocalGroupClassDate(date))
    dispatch(setCreatingGroupClassDate(false))
  })
}

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
    dispatch(setLocalEffectiveDate(response.data.fetchSchedule))
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
      dispatch(setEditingParentId(0))
      dispatch(setEditingParentOfStudentId(0))
    }

    dispatch(setMutatingParent(false))
  })
}

export const mutateStudent = student => async dispatch => {
  dispatch(setMutatingStudent(true))

  const adding = !student.id

  const response = await (adding ? requests.createStudent(student) : requests.updateStudent(student))

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
      dispatch(setAddingStudent(false))
    } else {
      dispatch(updateLocalStudent({ student }))
      dispatch(setEditingStudentId(0))
    }

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
    dispatch(setLocalEffectiveDate(date))
    dispatch(setMutatingEffectiveDate(false))
  })
}

// Selectors
export const getEffectiveDate = state => { return { date: state.schedule.effectiveDate, month: state.schedule.effectiveMonth, year: state.schedule.effectiveYear } }
export const getParents = state => state.schedule.parents
export const getStudents = state => state.schedule.students
export const getUsers = state => state.schedule.users
export const isAddingGroupClassDate = state => state.schedule.addingGroupClassDate
export const isAddingParent = state => state.schedule.addingParent
export const isAddingStudent = state => state.schedule.addingStudent
export const isConfirmingDeleteStudentId = state => state.schedule.confirmingDeleteStudentId
export const isCreatingGroupClassDate = state => state.schedule.creatingGroupClassDate
export const isDeletingStudentId = state => state.schedule.deletingStudentId
export const isEditingEffectiveDate = state => state.schedule.editingEffectiveDate
export const isEditingParentId = state => state.schedule.editingParentId
export const isEditingParentOfStudentId = state => state.schedule.editingParentOfStudentId
export const isEditingStudentId = state => state.schedule.editingStudentId
export const isMutatingEffectiveDate = state => state.schedule.mutatingEffectiveDate
export const isMutatingParent = state => state.schedule.mutatingParent
export const isMutatingStudent = state => state.schedule.mutatingStudent

// Reducer
export default slice.reducer
