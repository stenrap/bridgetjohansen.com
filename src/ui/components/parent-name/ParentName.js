import React from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import {
  getUsers,
  isEditingParentId,
  isEditingParentOfStudentId,
  setEditingParentId,
  setEditingParentOfStudentId
} from '../../store/scheduleSlice'
import ParentModal from '../modals/ParentModal'
import styles from './ParentName.module.scss'

export default props => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const editingParentId = useSelector(isEditingParentId)
  const editingParentOfStudentId = useSelector(isEditingParentOfStudentId)
  const users = useSelector(getUsers)

  const modal = editingParentId === props.parent.id && editingParentOfStudentId === props.studentId && (
    <ParentModal
      emails={users.filter(user => user.parentId === props.parent.id).map(user => user.email).join('\n')}
      onCancel={() => {
        batch(() => {
          dispatch(setEditingParentId(0))
          dispatch(setEditingParentOfStudentId(0))
        })
      }}
      parent={props.parent}
    />
  )

  const name = (
    admin
      ? (
        <span
          className={styles.link}
          onClick={() => {
            batch(() => {
              dispatch(setEditingParentId(props.parent.id))
              dispatch(setEditingParentOfStudentId(props.studentId))
            })
          }}
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
