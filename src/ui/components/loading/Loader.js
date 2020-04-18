import React from 'react'

import styles from './Loader.module.scss'

export default props => {
  return (
    <div className={styles.loader}>
      <span className={styles.loaderNotes}>
        ♫
      </span>
      <div className={styles.loaderRing} />
    </div>
  )
}
