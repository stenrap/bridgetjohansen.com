import React from 'react'

import Student from '../student/Student'
import styles from './LessonDay.module.scss'

export default props => {
  return (
    <div className={styles.day}>
      <div className={styles.name}>
        {props.name}
      </div>
      <div className={styles.students}>
        {props.students.map(student => {
          return <Student key={`student-${student.id}`} {...student} />
        })}
      </div>
    </div>
  )
}
