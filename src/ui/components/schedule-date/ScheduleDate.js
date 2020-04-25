import React from 'react'

import ScheduleDateLink from '../schedule-date-link/ScheduleDateLink'
import styles from './ScheduleDate.module.scss'

export default ({ date, isAdmin }) => {
  return (
    <div className={styles.scheduleDate}>
      Effective {isAdmin ? <ScheduleDateLink date={date} /> : date}
    </div>
  )
}
