import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../../store/userSlice'
import {
  isEditingGroupClassId,
  setEditingGroupClassId
} from '../../../store/scheduleSlice'
import format from '../../../../shared/libs/format'
import GroupClassModal from '../../modal/GroupClassModal'
import styles from './GroupClass.module.scss'

export default ({ groupClass }) => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const editingGroupClassId = useSelector(isEditingGroupClassId)
  const formattedDate = format.date(groupClass)

  const modal = editingGroupClassId === groupClass.id && (
    <GroupClassModal
      groupClass={groupClass}
    />
  )

  const date = (
    admin
      ? (
        <>
          <span
            className={styles.groupClassLink}
            onClick={() => dispatch(setEditingGroupClassId(groupClass.id))}
          >
            {formattedDate}
          </span>
        </>
      )
      : formattedDate
  )

  return (
    <div className={styles.groupClass}>
      {date}
      {modal}
    </div>
  )
}
