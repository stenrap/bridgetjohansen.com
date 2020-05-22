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
    </div>
  )
}
