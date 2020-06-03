import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import { getUsers, isEditingParent, setEditingParent } from '../../store/scheduleSlice'
import ParentModal from '../modal/ParentModal'
import styles from './ParentName.module.scss'

export default parent => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const editingParent = useSelector(isEditingParent)
  const users = useSelector(getUsers)

  const modal = editingParent && (
    <ParentModal
      emails={users.map(user => user.email).join('\n')}
      onCancel={() => dispatch(setEditingParent(false))}
      parent={parent}
    />
  )

  const name = (
    admin
      ? (
        <span
          className={styles.link}
          onClick={() => dispatch(setEditingParent(true))}
        >
          {parent.name}
        </span>
      )
      : parent.name
  )

  return (
    <div className={styles.name}>
      {name}
      {modal}
    </div>
  )
}
