import React from 'react'

import Loader from './Loader'
import Modal from '../modal/Modal'
import styles from './LoadingModal.module.scss'

export default props => {
  return (
    <Modal
      className={styles.loadingModal}
      showButtons={false}
      title={props.title}
    >
      <Loader className={styles.loadingModalLoader} />
    </Modal>
  )
}
