import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAddingStudent, setAddingStudent } from '../../store/scheduleSlice'
import StudentModal from '../modal/StudentModal'
import styles from './AddStudentLink.module.scss'

export default () => {
  const addingStudent = useSelector(isAddingStudent)
  const dispatch = useDispatch()

  const modal = addingStudent && (
    <StudentModal
      onCancel={() => dispatch(setAddingStudent(false))}
    />
  )

  return (
    <>
      <span
        className={styles.addStudentLink}
        onClick={() => dispatch(setAddingStudent(true))}
      >
        Add Student
      </span>
      {modal}
    </>
  )
}
