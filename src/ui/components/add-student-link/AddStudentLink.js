import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getParents,
  isAddingStudent,
  setAddingParent,
  setAddingStudent
} from '../../store/scheduleSlice'
import Modal from '../modal/Modal'
import StudentModal from '../modal/StudentModal'
import styles from './AddStudentLink.module.scss'

export default () => {
  const addingStudent = useSelector(isAddingStudent)
  const dispatch = useDispatch()
  const parents = useSelector(getParents)

  const [noParentsError, setNoParentsError] = useState(false)

  const modal = (noParentsError || addingStudent) && (
    noParentsError
      ? (
        <Modal
          className={styles.noParentsModal}
          onOk={() => {
            setNoParentsError(false)
            dispatch(setAddingParent(true))
          }}
          showCancel={false}
          title='Need Parents'
        >
          <p className={styles.noParentsText}>
            Adding a student requires selecting parents from a list,
            but you have no parents. Please add a parent first.
          </p>
        </Modal>
      )
      : (
        <StudentModal
          onCancel={() => dispatch(setAddingStudent(false))}
        />
      )
  )

  return (
    <>
      <span
        className={styles.addStudentLink}
        onClick={() => {
          if (parents.length === 0) return setNoParentsError(true)
          dispatch(setAddingStudent(true))
        }}
      >
        Add Student
      </span>
      {modal}
    </>
  )
}
