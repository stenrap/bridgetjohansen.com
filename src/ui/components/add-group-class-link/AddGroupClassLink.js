import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  isAddingGroupClass,
  setAddingGroupClass
} from '../../store/scheduleSlice'
import GroupClassModal from '../modals/GroupClassModal'
import styles from './AddGroupClassLink.module.scss'

export default () => {
  const addingGroupClass = useSelector(isAddingGroupClass)
  const dispatch = useDispatch()

  const modal = addingGroupClass && (
    <GroupClassModal />
  )

  return (
    <>
      <span
        className={styles.addGroupClassLink}
        onClick={() => dispatch(setAddingGroupClass(true))}
      >
        Add Group Class
      </span>
      {modal}
    </>
  )
}
