import React from 'react'

import styles from './Button.module.scss'

export default props => {
  return (
    <button className={styles.button}>
      {props.children}
    </button>
  )
}
