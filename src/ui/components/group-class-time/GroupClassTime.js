import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  deleteGroupClassTime,
  getStudents,
  isConfirmingDeleteGroupClassTimeId,
  isDeletingGroupClassTimeId,
  isEditingGroupClassTimeId,
  setConfirmingDeleteGroupClassTimeId,
  setEditingGroupClassTimeId
} from '../../store/scheduleSlice'
import { isAdmin } from '../../store/userSlice'
import GroupClassTimeModal from '../modals/GroupClassTimeModal'
import LoadingModal from '../loading/LoadingModal'
import Modal from '../modals/Modal'
import styles from './GroupClassTime.module.scss'

export default groupClassTime => {
  const admin = useSelector(isAdmin)
  const allStudents = useSelector(getStudents)
  const confirmingDeleteGroupClassTimeId = useSelector(isConfirmingDeleteGroupClassTimeId)
  const deletingGroupClassTimeId = useSelector(isDeletingGroupClassTimeId)
  const dispatch = useDispatch()
  const editingGroupClassTimeId = useSelector(isEditingGroupClassTimeId)

  const displayMinutes = groupClassTime.minutes < 10 ? `0${groupClassTime.minutes}` : groupClassTime.minutes

  const students = groupClassTime.studentIds.map(id => {
    for (const student of allStudents) {
      if (id === student.id) {
        return { id, name: student.name }
      }
    }
  })

  students.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })

  const timeText = `${groupClassTime.hour}:${displayMinutes} ${groupClassTime.meridiem}`

  const time = (
    admin
      ? (
        <span
          className={styles.timeLink}
          onClick={() => dispatch(setEditingGroupClassTimeId(groupClassTime.id))}
        >
          {timeText}
        </span>
      )
      : timeText
  )

  const modal = editingGroupClassTimeId === groupClassTime.id && (
    <GroupClassTimeModal
      groupClassTime={groupClassTime}
      onCancel={() => dispatch(setEditingGroupClassTimeId(0))}
    />
  )

  const confirmingDelete = confirmingDeleteGroupClassTimeId === groupClassTime.id
  const deleting = deletingGroupClassTimeId === groupClassTime.id

  const deleteModal = (confirmingDelete || deleting) && (
    confirmingDelete ? (
      <Modal
        cancelLabel='No'
        className={styles.confirmDeleteModal}
        okLabel='Yes'
        onCancel={() => dispatch(setConfirmingDeleteGroupClassTimeId(0))}
        onOk={() => dispatch(deleteGroupClassTime(groupClassTime.id))}
        title='Delete Class'
      >
        <p className={styles.confirmDeleteText}>
          Are you sure you want to delete the class at {timeText}?
        </p>
      </Modal>
    ) : (
      <LoadingModal title='Deleting time...' />
    )
  )

  return (
    <div className={styles.groupClassTime}>
      <div className={styles.time}>
        {time}
        <div className={styles.duration}>
          {`(${groupClassTime.duration} minutes)`}
        </div>
      </div>
      <div className={styles.students}>
        {students.map(({ id, name }, index) => {
          return (
            <div
              className={index % 2 !== 0 ? styles.odd : styles.even}
              key={`group-class-time-student-${id}`}
            >
              {name}
            </div>
          )
        })}
      </div>
      {modal}
      {deleteModal}
    </div>
  )
}
