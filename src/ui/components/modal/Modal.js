import React from 'react'
import ReactDOM from 'react-dom'

import Button from '../button/Button'
import styles from './Modal.module.scss'

export default props => {
  const {
    children,
    title
  } = props

  const modal = (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalTitle}>{title}</div>
        {children}
        <div className={styles.modalButtons}>
          <Button>OK</Button>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(
    modal,
    document.getElementById('modal')
  )
}
