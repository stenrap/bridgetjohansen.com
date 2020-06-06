import React from 'react'

import styles from './AddTimeLink.module.scss'

export default () => {
  return (
    <>
      <span
        className={styles.addTimeLink}
        onClick={() => console.log('Opening the Add Time modal...')}
      >
        Add Time
      </span>
    </>
  )
}
