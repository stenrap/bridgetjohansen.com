import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  deleteStudent,
  getParents,
  isConfirmingDeleteStudentId,
  isDeletingStudentId,
  setConfirmingDeleteStudentId
} from '../../store/scheduleSlice'
import format from '../../../shared/libs/format'
import LoadingModal from '../loading/LoadingModal'
import Modal from '../modal/Modal'
import ParentName from '../parent-name/ParentName'
import StudentName from '../student-name/StudentName'
import styles from './Student.module.scss'

export default student => {
  const confirmingDeleteStudentId = useSelector(isConfirmingDeleteStudentId)
  const deletingStudentId = useSelector(isDeletingStudentId)
  const dispatch = useDispatch()
  const parents = useSelector(getParents)

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
      <StudentName {...student} />
      <div className={styles.time}>
        {student.lessonHour}:{format.minutes(student.lessonMinutes)} {student.lessonMeridiem} ({student.lessonDuration} minutes)
      </div>
      {student.parentIds && student.parentIds.map(id => {
        const parent = parents.find(parent => parent.id === id)
        return (
          <div key={`student-parent-${id}`}>
            <ParentName parent={parent} studentId={student.id} />
            <div className={styles.phone}>
              <a href={`tel:${parent.phone}`}>{parent.phone}</a>
            </div>
          </div>
        )
      })}
      {deleteModal}
    </div>
  )
}
