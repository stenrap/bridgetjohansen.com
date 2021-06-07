import { PropsWithChildren, ReactPortal, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Button from '../components/button/Button'
import ModalProps from './ModalProps'
import styles from './Modal.module.scss'

const Modal = (props: PropsWithChildren<ModalProps>): ReactPortal => {
  useEffect((): () => void => {
    document.body.style.overflow = 'hidden'
    return (): void => { document.body.style.overflow = '' }
  }, [])

  const modal = (
    <div className={styles.modalBackground}>
      <div className={`${styles.modal}${props.className ? ` ${props.className}` : ''}`}>
        <div className={styles.modalTitle}>{props.title}</div>
        {props.children}
        {props.onOk
          ? (
            <div className={styles.modalButtons}>
              <Button kind='primary' onClick={props.onOk}>{props.okLabel || 'OK'}</Button>
              {props.onCancel
                ? <Button kind='secondary' onClick={props.onCancel}>{props.cancelLabel || 'Cancel'}</Button>
                : null
              }
            </div>
          )
          : null
        }
      </div>
    </div>
  )

  // The <div id='modal' /> element is defined in _document.tsx, so we disable the non-null assertion warning.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return ReactDOM.createPortal(modal, document.getElementById('modal')!)
}

export default Modal
