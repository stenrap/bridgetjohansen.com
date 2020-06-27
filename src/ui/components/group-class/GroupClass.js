import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import {
  deleteGroupClass,
  isConfirmingDeleteGroupClassId,
  isDeletingGroupClassId,
  isEditingGroupClassId,
  setConfirmingDeleteGroupClassId,
  setEditingGroupClassId
} from '../../store/scheduleSlice'
import format from '../../../shared/libs/format'
import GroupClassModal from '../modals/GroupClassModal'
import LoadingModal from '../loading/LoadingModal'
import Modal from '../modals/Modal'
import styles from './GroupClass.module.scss'

export default ({ groupClass }) => {
  const admin = useSelector(isAdmin)
  const confirmingDeleteStudentId = useSelector(isConfirmingDeleteGroupClassId)
  const deletingGroupClassId = useSelector(isDeletingGroupClassId)
  const dispatch = useDispatch()
  const editingGroupClassId = useSelector(isEditingGroupClassId)
  const formattedDate = format.date(groupClass)

  const modal = editingGroupClassId === groupClass.id && (
    <GroupClassModal
      groupClass={groupClass}
    />
  )

  const confirmingDelete = confirmingDeleteStudentId === groupClass.id
  const deleting = deletingGroupClassId === groupClass.id

  const deleteModal = (confirmingDelete || deleting) && (
    confirmingDelete
      ? (
        <Modal
          cancelLabel='No'
          className={styles.confirmDeleteModal}
          okLabel='Yes'
          onCancel={() => dispatch(setConfirmingDeleteGroupClassId(0))}
          onOk={() => dispatch(deleteGroupClass(groupClass.id))}
          title='Delete Class'
        >
          <p className={styles.confirmDeleteText}>
            Are you sure you want to delete the class on {formattedDate}?
          </p>
        </Modal>
      )
      : (
        <LoadingModal title='Deleting class...' />
      )
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
