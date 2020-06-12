import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  isAddingGroupClassDate,
  setAddingGroupClassDate
} from '../../../store/scheduleSlice'
import GroupClass from '../../modal/GroupClass'
import styles from './AddDateLink.module.scss'

export default () => {
  const addingGroupClassDate = useSelector(isAddingGroupClassDate)
  const dispatch = useDispatch()

  const modal = addingGroupClassDate && (
    <GroupClass />
  )

  return (
    <>
      <span
        className={styles.addDateLink}
        onClick={() => dispatch(setAddingGroupClassDate(true))}
      >
        Add Date
      </span>
      {modal}
    </>
  )
}
