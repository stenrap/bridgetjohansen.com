import React from 'react'

import styles from './AddGroupClassTimeLink.module.scss'

export default () => {
  return (
    <>
      <span
        className={styles.addTimeLink}
        onClick={() => console.log('Opening the Add Time modal...')}
      >
        Add Group Class Time
      </span>
    </>
  )
}
