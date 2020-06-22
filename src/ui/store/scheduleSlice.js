import { batch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import { setLoading } from './loadingSlice'
import { sortDates } from '../../shared/libs/date'
import { sortParents } from '../../shared/libs/parent'
import { sortStudents } from '../../shared/libs/student'
import { sortTimes } from '../../shared/libs/time'
import requests from '../Requests'

export const slice = createSlice({
  name: 'schedule',
  initialState: {
    addingGroupClass: false,
    addingGroupClassTime: false,
    addingParent: false,
    addingStudent: false,
    confirmingDeleteStudentId: 0,
    confirmingDeleteGroupClassId: 0,
    confirmingDeleteGroupClassTimeId: 0,
    deletingGroupClassId: 0,
    deletingStudentId: 0,
    editingEffectiveDate: false,
    editingGroupClassId: 0,
    editingGroupClassTimeId: 0,
    editingParentId: 0,
    editingParentOfStudentId: 0,
    editingStudentId: 0,
    effectiveDate: 0,
    effectiveMonth: -1,
    effectiveYear: 0,
    groupClasses: [],
    groupClassTimes: [],
    mutatingEffectiveDate: false,
    mutatingGroupClass: false,
    mutatingGroupClassTime: false,
    mutatingParent: false,
    mutatingStudent: false,
    parents: [],
    students: [],
    users: []
  },
  reducers: {
    addLocalGroupClass: (state, action) => {
      state.groupClasses.push(action.payload.groupClass)
      state.groupClasses = sortDates(state.groupClasses)
    },
    addLocalGroupClassTime: (state, action) => {
      state.groupClassTimes.push(action.payload.groupClassTime)
      state.groupClassTimes = sortTimes(state.groupClassTimes)
    },
    addLocalParent: (state, action) => {
      state.parents = sortParents([...state.parents, action.payload.parent])
    },
    addLocalStudent: (state, action) => {
      state.students = sortStudents([...state.students, action.payload.student])
    },
    addLocalUsers: (state, action) => {
      state.users.push(...action.payload.users)
    },
    deleteLocalGroupClass: (state, action) => {
      const groupClasses = []

      for (const groupClass of state.groupClasses) {
        if (groupClass.id !== action.payload.id) {
          groupClasses.push(groupClass)
        }
      }

      state.groupClasses = sortDates(groupClasses)
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
    setAddingGroupClass: (state, action) => {
      state.addingGroupClass = action.payload
    },
    setAddingGroupClassTime: (state, action) => {
      state.addingGroupClassTime = action.payload
    },
    setAddingStudent: (state, action) => {
      state.addingStudent = action.payload
    },
    setConfirmingDeleteStudentId: (state, action) => {
      state.confirmingDeleteStudentId = action.payload
    },
    setConfirmingDeleteGroupClassId: (state, action) => {
      state.confirmingDeleteGroupClassId = action.payload
    },
    setConfirmingDeleteGroupClassTimeId: (state, action) => {
      state.confirmingDeleteGroupClassTimeId = action.payload
    },
    setDeletingGroupClassId: (state, action) => {
      state.deletingGroupClassId = action.payload
    },
    setDeletingStudentId: (state, action) => {
      state.deletingStudentId = action.payload
    },
    setEditingEffectiveDate: (state, action) => {
      state.editingEffectiveDate = action.payload
    },
    setEditingGroupClassId: (state, action) => {
      state.editingGroupClassId = action.payload
    },
    setEditingGroupClassTimeId: (state, action) => {
      state.editingGroupClassTimeId = action.payload
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
    setGroupClasses: (state, action) => {
      state.groupClasses = sortDates(action.payload.groupClasses)
    },
    setGroupClassTimes: (state, action) => {
      state.groupClassTimes = sortTimes(action.payload.groupClassTimes)
    },
    setLocalEffectiveDate: (state, action) => {
      state.effectiveDate = action.payload.date
      state.effectiveMonth = action.payload.month
      state.effectiveYear = action.payload.year
    },
    setMutatingEffectiveDate: (state, action) => {
      state.mutatingEffectiveDate = action.payload
    },
    setMutatingGroupClass: (state, action) => {
      state.mutatingGroupClass = action.payload
    },
    setMutatingGroupClassTime: (state, action) => {
      state.mutatingGroupClassTime = action.payload
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
    updateLocalGroupClass: (state, action) => {
      const groupClasses = [action.payload.groupClass]

      for (const groupClass of state.groupClasses) {
        if (groupClass.id !== action.payload.groupClass.id) {
          groupClasses.push(groupClass)
        }
      }

      state.groupClasses = sortDates(groupClasses)
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
  addLocalGroupClass,
  addLocalGroupClassTime,
  addLocalParent,
  addLocalStudent,
  addLocalUsers,
  deleteLocalGroupClass,
  deleteLocalStudent,
  deleteLocalUsers,
  setAddingGroupClass,
  setAddingGroupClassTime,
  setAddingParent,
  setAddingStudent,
  setConfirmingDeleteStudentId,
  setConfirmingDeleteGroupClassId,
  setConfirmingDeleteGroupClassTimeId,
  setDeletingGroupClassId,
  setDeletingStudentId,
  setEditingEffectiveDate,
  setEditingGroupClassId,
  setEditingGroupClassTimeId,
  setEditingParentId,
  setEditingParentOfStudentId,
  setEditingStudentId,
  setLocalEffectiveDate,
  setGroupClasses,
  setGroupClassTimes,
  setMutatingEffectiveDate,
  setMutatingGroupClass,
  setMutatingGroupClassTime,
  setMutatingParent,
  setMutatingStudent,
  setParents,
  setStudents,
  updateLocalGroupClass,
  updateLocalParent,
  updateLocalStudent
} = slice.actions

// Thunks
export const deleteGroupClass = id => async dispatch => {
  batch(() => {
    dispatch(setConfirmingDeleteGroupClassId(0))
    dispatch(setDeletingGroupClassId(id))
  })

  const response = await requests.deleteGroupClass(id)

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error deleting group class...')
    console.log(response.errors)
    return
  }

  batch(() => {
    dispatch(deleteLocalGroupClass({ id }))
    dispatch(setDeletingGroupClassId(0))
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
    dispatch(setGroupClasses(response.data.fetchSchedule))
    dispatch(setGroupClassTimes(response.data.fetchSchedule))
    dispatch(setLoading(false))
  })
}

export const mutateGroupClass = groupClass => async dispatch => {
  batch(() => {
    dispatch(setAddingGroupClass(false))
    dispatch(setEditingGroupClassId(0))
    dispatch(setMutatingGroupClass(true))
  })

  const adding = !groupClass.id

  const response = await (adding ? requests.createGroupClass(groupClass) : requests.updateGroupClass(groupClass))

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error mutating group class...')
    console.log(response.errors)
    return
  }

  batch(() => {
    if (adding) {
      groupClass.id = response.data.createGroupClass.id
      dispatch(addLocalGroupClass({ groupClass }))
    } else {
      dispatch(updateLocalGroupClass({ groupClass }))
    }

    dispatch(setMutatingGroupClass(false))
  })
}

export const mutateGroupClassTime = groupClassTime => async dispatch => {
  dispatch(setMutatingGroupClassTime(true))

  const adding = !groupClassTime.id

  const response = await requests.createGroupClassTime(groupClassTime)

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error mutating group class time...')
    console.log(response.errors)
    return
  }

  batch(() => {
    if (adding) {
      groupClassTime.id = response.data.createGroupClassTime.id
      dispatch(addLocalGroupClassTime({ groupClassTime }))
      dispatch(setAddingGroupClassTime(false))
    } else {
      // TODO .... Update the local group class time
    }

    dispatch(setMutatingGroupClassTime(false))
  })
}

export const mutateParent = parent => async dispatch => {
  dispatch(setMutatingParent(true))

  const adding = !parent.id

  const response = await (adding ? requests.createParent(parent) : requests.updateParent(parent))

  if (response.errors) {
    // TODO .... https://github.com/stenrap/bridgetjohansen.com/issues/20
    console.log('Error mutating parent...')
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
export const getGroupClasses = state => state.schedule.groupClasses
export const getGroupClassTimes = state => state.schedule.groupClassTimes
export const getParents = state => state.schedule.parents
export const getStudents = state => state.schedule.students
export const getUsers = state => state.schedule.users
export const isAddingGroupClass = state => state.schedule.addingGroupClass
export const isAddingGroupClassTime = state => state.schedule.addingGroupClassTime
export const isAddingParent = state => state.schedule.addingParent
export const isAddingStudent = state => state.schedule.addingStudent
export const isConfirmingDeleteStudentId = state => state.schedule.confirmingDeleteStudentId
export const isConfirmingDeleteGroupClassId = state => state.schedule.confirmingDeleteGroupClassId
export const isConfirmingDeleteGroupClassTimeId = state => state.schedule.confirmingDeleteGroupClassTimeId
export const isDeletingGroupClassId = state => state.schedule.deletingGroupClassId
export const isDeletingStudentId = state => state.schedule.deletingStudentId
export const isEditingEffectiveDate = state => state.schedule.editingEffectiveDate
export const isEditingGroupClassId = state => state.schedule.editingGroupClassId
export const isEditingGroupClassTimeId = state => state.schedule.editingGroupClassTimeId
export const isEditingParentId = state => state.schedule.editingParentId
export const isEditingParentOfStudentId = state => state.schedule.editingParentOfStudentId
export const isEditingStudentId = state => state.schedule.editingStudentId
export const isMutatingEffectiveDate = state => state.schedule.mutatingEffectiveDate
export const isMutatingGroupClass = state => state.schedule.mutatingGroupClass
export const isMutatingGroupClassTime = state => state.schedule.mutatingGroupClassTime
export const isMutatingParent = state => state.schedule.mutatingParent
export const isMutatingStudent = state => state.schedule.mutatingStudent

// Reducer
export default slice.reducer
