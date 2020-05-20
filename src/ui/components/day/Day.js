import React from 'react'

import styles from './Day.module.scss'

export default props => {
  return (
    <div className={styles.day}>
      <div className={styles.name}>{props.name}</div>
    </div>
  )
}
