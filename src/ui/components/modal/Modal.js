import React from 'react'
import ReactDOM from 'react-dom'

import Button from '../button/Button'
import styles from './Modal.module.scss'

export default props => {
  const {
    cancelLabel = 'Cancel',
    children,
    className,
    okLabel = 'OK',
    onOk,
    onCancel,
    showButtons = true,
    showCancel = true,
    title
  } = props

  const modalClass = `${styles.modal}${className ? ` ${className}` : ''}`

  const buttons = showButtons && (
    <div className={styles.modalButtons}>
      <Button
        onClick={onOk}
      >
        {okLabel}
      </Button>
      {showCancel && (
        <Button
          kind='secondary'
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
      )}
    </div>
  )

  const modal = (
    <div className={styles.modalBackground}>
      <div className={modalClass}>
        <div className={styles.modalTitle}>{title}</div>
        {children}
        {buttons}
      </div>
    </div>
  )

  return ReactDOM.createPortal(
    modal,
    document.getElementById('modal')
  )
}
