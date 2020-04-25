import React from 'react'

import styles from './ScheduleDateLink.module.scss'

export default ({ date }) => {
  return (
    <span
      className={styles.scheduleDateLink}
    >
      {date}
    </span>
  )
}
