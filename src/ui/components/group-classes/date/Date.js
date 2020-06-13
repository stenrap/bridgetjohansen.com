import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../../store/userSlice'
import {
  isEditingGroupClassDateId,
  setEditingGroupClassDateId
} from '../../../store/scheduleSlice'
import format from '../../../../shared/libs/format'
import GroupClass from '../../modal/GroupClass'
import styles from './Date.module.scss'

export default ({ groupClassDate }) => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const editingGroupClassDateId = useSelector(isEditingGroupClassDateId)
  const formattedDate = format.date(groupClassDate)

  const modal = editingGroupClassDateId === groupClassDate.id && (
    <GroupClass
      groupClassDate={groupClassDate}
    />
  )

  const date = (
    admin
      ? (
        <>
          <span
            className={styles.groupClassDateLink}
            onClick={() => dispatch(setEditingGroupClassDateId(groupClassDate.id))}
          >
            {formattedDate}
          </span>
        </>
      )
      : formattedDate
  )

  return (
    <div className={styles.groupClassDate}>
      {date}
      {modal}
    </div>
  )
}
