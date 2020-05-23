import React from 'react'

import styles from './Button.module.scss'

export default props => {
  const {
    children,
    className,
    kind = 'primary',
    onClick
  } = props

  return (
    <button
      className={`${styles.button} ${styles[kind]}${className ? ` ${className}` : ''}`}
      onClick={event => onClick(event)}
    >
      {children}
    </button>
  )
}
