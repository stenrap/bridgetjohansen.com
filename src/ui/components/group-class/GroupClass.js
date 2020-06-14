import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import {
  isConfirmingDeleteGroupClassId,
  isEditingGroupClassId,
  setConfirmingDeleteGroupClassId,
  setEditingGroupClassId
} from '../../store/scheduleSlice'
import format from '../../../shared/libs/format'
import GroupClassModal from '../modal/GroupClassModal'
import Modal from '../modal/Modal'
import styles from './GroupClass.module.scss'

export default ({ groupClass }) => {
  const admin = useSelector(isAdmin)
  const confirmingDeleteStudentId = useSelector(isConfirmingDeleteGroupClassId)
  const dispatch = useDispatch()
  const editingGroupClassId = useSelector(isEditingGroupClassId)
  const formattedDate = format.date(groupClass)

  const modal = editingGroupClassId === groupClass.id && (
    <GroupClassModal
      groupClass={groupClass}
    />
  )

  const deleteModal = confirmingDeleteStudentId === groupClass.id && (
    <Modal
      cancelLabel='No'
      className={styles.confirmDeleteModal}
      okLabel='Yes'
      onCancel={() => dispatch(setConfirmingDeleteGroupClassId(0))}
      onOk={() => console.log('Deleting group class...')}
      title='Delete Group Class'
    >
      <p
        className={styles.confirmDeleteText}
      >
        Are you sure you want to delete the group class on {formattedDate}?
      </p>
    </Modal>
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
      {deleteModal}
    </div>
  )
}
