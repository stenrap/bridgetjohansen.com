import React from 'react'

import styles from './AddDateLink.module.scss'

export default () => {
  return (
    <>
      <span
        className={styles.addDateLink}
        onClick={() => console.log('Opening the Add Date modal...')}
      >
        Add Date
      </span>
    </>
  )
}
