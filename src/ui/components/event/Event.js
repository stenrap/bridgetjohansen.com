import React from 'react'

import styles from './Event.module.scss'

export default event => {
  return (
    <div className={styles.event}>
      <div className={styles.name}>{event.name}</div>
      <div className={styles.location}>{event.location}</div>
      <div className={styles.dateAndTime}>{event.dateAndTime}</div>
    </div>
  )
}
