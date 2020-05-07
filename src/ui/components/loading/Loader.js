import React from 'react'

import styles from './Loader.module.scss'

export default props => {
  const className = `${styles.loader}${props.className ? ` ${props.className}` : ''}`

  return (
    <div className={className}>
      <span className={styles.loaderNotes}>
        ♫
      </span>
      <div className={styles.loaderRing} />
    </div>
  )
}
