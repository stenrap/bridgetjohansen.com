import React from 'react'

import Student from '../student/Student'
import styles from './LessonDay.module.scss'

export default props => {
  const students = []

  for (const student of props.students) {
    students.push(
      <Student key={`student-${student.id}`} {...student} />
    )
  }

  return (
    <div className={styles.day}>
      <div className={styles.name}>
        {props.name}
      </div>
      <div className={styles.students}>
        {students}
      </div>
    </div>
  )
}
