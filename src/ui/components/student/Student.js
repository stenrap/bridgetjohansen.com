import React from 'react'
import { useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import format from '../../../shared/libs/format'
import styles from './Student.module.scss'

export default student => {
  const admin = useSelector(isAdmin)
  // const dispatch = useDispatch()

  const adminButtons = admin && (
    <div>Hello, admin buttons</div>
  )

  return (
    <div className={styles.student}>
      <div className={styles.studentName}>{student.name}</div>
      <div className={styles.studentTime}>
        {student.lessonHour}:{format.minutes(student.lessonMinutes)} {student.lessonMeridiem} ({student.lessonDuration})
      </div>
      <div>{student.parents}</div>
      <div>{student.phone}</div>
      {adminButtons}
    </div>
  )
}
