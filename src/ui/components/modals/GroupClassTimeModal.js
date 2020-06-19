import React, { useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

import {
  getGroupClassTimes,
  getStudents,
  isMutatingGroupClassTime,
  mutateGroupClassTime,
  setConfirmingDeleteGroupClassTimeId,
  setEditingGroupClassTimeId
} from '../../store/scheduleSlice'
import Button from '../button/Button'
import LoadingModal from '../loading/LoadingModal'
import Modal from './Modal'
import styles from './GroupClassTimeModal.module.scss'

export default props => {
  const dispatch = useDispatch()
  const groupClassTimes = useSelector(getGroupClassTimes)
  const mutatingGroupClassTime = useSelector(isMutatingGroupClassTime)
  const unsortedStudents = useSelector(getStudents)

  const {
    groupClassTime = {}
  } = props

  const [duration, setDuration] = useState(groupClassTime.duration || 30)
  const [hour, setHour] = useState(groupClassTime.hour || 3)
  const [meridiem, setMeridiem] = useState(groupClassTime.meridiem || 'pm')
  const [minutes, setMinutes] = useState(groupClassTime.minutes || 0)
  const [studentIds, setStudentIds] = useState(groupClassTime.studentIds || [])
  const [studentIdsError, setStudentIdsError] = useState(false)

  if (mutatingGroupClassTime) {
    return <LoadingModal title={`${mutatingGroupClassTime.id ? 'Editing' : 'Adding'} group class time...`} />
  } else {
    const students = [...unsortedStudents].sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })

    return (
      <Modal
        className={styles.groupClassTimeModal}
        onOk={() => {
          if (studentIds.length === 0) return setStudentIdsError(true)

          dispatch(mutateGroupClassTime({
            duration,
            hour,
            id: groupClassTime.id,
            meridiem,
            minutes,
            studentIds
          }))
        }}
        title={`${groupClassTime.id ? 'Edit' : 'Add'} Group Class Time`}
        {...props}
      >
        {groupClassTime.id && (
          <Button
            className={styles.deleteButton}
            onClick={() => {
              batch(() => {
                dispatch(setEditingGroupClassTimeId(0))
                dispatch(setConfirmingDeleteGroupClassTimeId(groupClassTime.id))
              })
            }}
          >
            Delete
          </Button>
        )}
        <div className='inputRow'>
          <select
            className={styles.hour}
            onChange={event => setHour(Number(event.target.value))}
            value={hour}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
          </select>
          <select
            className={styles.minutes}
            onChange={event => setMinutes(Number(event.target.value))}
            value={minutes}
          >
            <option value={0}>00</option>
            <option value={5}>05</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
            <option value={40}>40</option>
            <option value={45}>45</option>
            <option value={50}>50</option>
            <option value={55}>55</option>
          </select>
          <select
            className={styles.minutes}
            onChange={event => setMeridiem(event.target.value)}
            value={meridiem}
          >
            <option value='am'>AM</option>
            <option value='pm'>PM</option>
          </select>
          <select
            className={styles.duration}
            onChange={event => setDuration(Number(event.target.value))}
            value={duration}
          >
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={50}>50 min</option>
            <option value={60}>60 min</option>
          </select>
        </div>
        <div>
          <label>Students</label>
          <div className={`${styles.students}${studentIdsError ? ` ${styles.studentsError}` : ''}`}>
            {students.map(student => {
              for (const time of groupClassTimes) {
                if (time.id !== groupClassTime.id && time.studentIds.includes(student.id)) {
                  return null
                }
              }

              const idAttribute = `studentSelector${student.id}`
              return (
                <div key={`group-class-time-student-${student.id}`}>
                  <input
                    checked={groupClassTime.studentIds && groupClassTime.studentIds.includes(student.id)}
                    id={idAttribute}
                    onChange={event => {
                      if (event.target.checked) {
                        setStudentIdsError(false)
                        setStudentIds(studentIds.concat(student.id))
                      } else {
                        const newStudentIds = []
                        for (const id of studentIds) {
                          if (id !== student.id) {
                            newStudentIds.push(id)
                          }
                        }
                        setStudentIds(newStudentIds)
                      }
                    }}
                    type='checkbox'
                  />
                  <label
                    htmlFor={idAttribute}
                  >
                    {student.name}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    )
  }
}
