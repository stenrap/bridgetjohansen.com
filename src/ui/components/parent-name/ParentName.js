import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import { getUsers, isEditingParentOfStudentId, setEditingParentOfStudentId } from '../../store/scheduleSlice'
import ParentModal from '../modal/ParentModal'
import styles from './ParentName.module.scss'

export default props => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const editingParentOfStudentId = useSelector(isEditingParentOfStudentId)
  const users = useSelector(getUsers)

  const modal = editingParentOfStudentId === props.studentId && (
    <ParentModal
      emails={users.filter(user => user.parentId === props.parent.id).map(user => user.email).join('\n')}
      onCancel={() => dispatch(setEditingParentOfStudentId(0))}
      parent={props.parent}
    />
  )

  const name = (
    admin
      ? (
        <span
          className={styles.link}
          onClick={() => dispatch(setEditingParentOfStudentId(props.studentId))}
        >
          {props.parent.name}
        </span>
      )
      : props.parent.name
  )

  return (
    <div className={styles.name}>
      {name}
      {modal}
    </div>
  )
}
