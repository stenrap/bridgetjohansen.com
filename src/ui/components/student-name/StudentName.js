import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import { isEditingStudentId, setEditingStudentId } from '../../store/scheduleSlice'
import StudentModal from '../modal/StudentModal'
import styles from './StudentName.module.scss'

export default student => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const editingStudentId = useSelector(isEditingStudentId)

  const modal = editingStudentId === student.id && (
    <StudentModal
      onCancel={() => dispatch(setEditingStudentId(0))}
      student={student}
    />
  )

  const name = (
    admin
      ? (
        <span
          className={styles.link}
          onClick={() => dispatch(setEditingStudentId(student.id))}
        >
          {student.name}
        </span>
      )
      : student.name
  )

  return (
    <div className={styles.name}>
      {name}
      {modal}
    </div>
  )
}
