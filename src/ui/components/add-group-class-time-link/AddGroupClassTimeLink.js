import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getParents, getStudents, setAddingParent, setAddingStudent } from '../../store/scheduleSlice'
import Modal from '../modals/Modal'
import styles from './AddGroupClassTimeLink.module.scss'

export default () => {
  const dispatch = useDispatch()
  const parents = useSelector(getParents)
  const students = useSelector(getStudents)

  const [noParents, setNoParents] = useState(false)
  const [noStudents, setNoStudents] = useState(false)

  const noParentsModal = noParents && (
    <Modal
      className={styles.missingSomethingModal}
      onOk={() => {
        setNoParents(false)
        dispatch(setAddingParent(true))
      }}
      showCancel={false}
      title='Need Students'
    >
      <p className={styles.missingSomethingText}>
        You need parents and students before you can add any
        group class times. Please start by adding a parent.
      </p>
    </Modal>
  )

  const noStudentsModal = noStudents && (
    <Modal
      className={styles.missingSomethingModal}
      onOk={() => {
        setNoStudents(false)
        dispatch(setAddingStudent(true))
      }}
      showCancel={false}
      title='Need Students'
    >
      <p className={styles.missingSomethingText}>
        Adding a group class time requires selecting students from a
        list, but you have no students. Please add a student first.
      </p>
    </Modal>
  )

  return (
    <>
      <span
        className={styles.addTimeLink}
        onClick={() => {
          if (parents.length === 0) return setNoParents(true)
          if (students.length === 0) return setNoStudents(true)
        }}
      >
        Add Group Class Time
      </span>
      {noParentsModal}
      {noStudentsModal}
    </>
  )
}
