import React from 'react'

import styles from './Header.module.css'

export default () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <span>Bridget Johansen</span>
        <span>Piano Studio</span>
      </div>
    </div>
  )
}
