import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import {
  deleteStudent,
  isConfirmingDeleteStudentId,
  isDeletingStudentId,
  setConfirmingDeleteStudentId
} from '../../store/scheduleSlice'
import Button from '../button/Button'
import deleteIcon from '../../images/delete.svg'
import edit from '../../images/edit.svg'
import format from '../../../shared/libs/format'
import LoadingModal from '../loading/LoadingModal'
import Modal from '../modal/Modal'
import styles from './Student.module.scss'

export default student => {
  const admin = useSelector(isAdmin)
  const confirmingDeleteStudentId = useSelector(isConfirmingDeleteStudentId)
  const deletingStudentId = useSelector(isDeletingStudentId)
  const dispatch = useDispatch()

  const adminButtons = admin && (
    <div className={styles.adminButtons}>
      <Button><img alt='Edit' src={edit} /></Button>
      <Button
        onClick={() => dispatch(setConfirmingDeleteStudentId(student.id))}
      >
        <img alt='Delete' src={deleteIcon} />
      </Button>
    </div>
  )

  const confirmingDeleteStudent = confirmingDeleteStudentId !== 0 && confirmingDeleteStudentId === student.id
  const deletingStudent = deletingStudentId !== 0 && deletingStudentId === student.id

  const deleteModal = (confirmingDeleteStudent || deletingStudent) && (
    deletingStudent
      ? (
        <LoadingModal title={`Deleting ${student.name}...`} />
      )
      : (
        <Modal
          cancelLabel='No'
          okLabel='Yes'
          onCancel={() => dispatch(setConfirmingDeleteStudentId(0))}
          onOk={() => dispatch(deleteStudent(student.id))}
          title='Delete Student'
        >
          Are you sure you want to delete {student.name}?
        </Modal>
      )
  )

  return (
    <div className={styles.student}>
      <div className={styles.name}>{student.name}</div>
      <div className={styles.time}>
        {student.lessonHour}:{format.minutes(student.lessonMinutes)} {student.lessonMeridiem} ({student.lessonDuration} minutes)
      </div>
      <div className={styles.parents}>
        {student.parents}
      </div>
      <div className={styles.phone}>
        <a href={`tel:${student.phone}`}>{student.phone}</a>
      </div>
      {adminButtons}
      {deleteModal}
    </div>
  )
}
