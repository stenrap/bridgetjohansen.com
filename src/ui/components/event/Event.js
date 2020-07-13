import React from 'react'

import EventName from '../event-name/EventName'
import styles from './Event.module.scss'

export default event => {
  return (
    <div className={styles.event}>
      <EventName {...event} />
      <div className={styles.location}>{event.location}</div>
      <div className={styles.dateAndTime}>{event.dateAndTime}</div>
    </div>
  )
}
