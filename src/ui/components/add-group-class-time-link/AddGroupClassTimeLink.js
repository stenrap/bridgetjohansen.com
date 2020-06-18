import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getStudents, isAddingGroupClassTime, setAddingGroupClassTime } from '../../store/scheduleSlice'
import GroupClassTimeModal from '../modals/GroupClassTimeModal'
import styles from './AddGroupClassTimeLink.module.scss'

export default () => {
  const addingGroupClassTime = useSelector(isAddingGroupClassTime)
  const dispatch = useDispatch()
  const students = useSelector(getStudents)

  if (students.length === 0) return null

  const modal = addingGroupClassTime && (
    <GroupClassTimeModal
      onCancel={() => dispatch(setAddingGroupClassTime(false))}
    />
  )

  return (
    <>
      <span
        className={styles.addTimeLink}
        onClick={() => dispatch(setAddingGroupClassTime(true))}
      >
        Add Group Class Time
      </span>
      {modal}
    </>
  )
}
