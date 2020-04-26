import React from 'react'

import styles from './Button.module.scss'

export default props => {
  const {
    children,
    kind = 'primary',
    onClick
  } = props

  return (
    <button
      className={`${styles.button} ${styles[kind]}`}
      onClick={event => onClick(event)}
    >
      {children}
    </button>
  )
}
