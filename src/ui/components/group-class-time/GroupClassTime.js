import React from 'react'
import { useSelector } from 'react-redux'

import { getStudents } from '../../store/scheduleSlice'
import styles from './GroupClassTime.module.scss'

export default props => {
  const allStudents = useSelector(getStudents)
  const displayMinutes = props.minutes < 10 ? `0${props.minutes}` : props.minutes

  const students = props.studentIds.map(id => {
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

  return (
    <div className={styles.groupClassTime}>
      <div className={styles.time}>
        {`${props.hour}:${displayMinutes} ${props.meridiem}`}
        <div className={styles.duration}>
          {`(${props.duration} minutes)`}
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
    </div>
  )
}
