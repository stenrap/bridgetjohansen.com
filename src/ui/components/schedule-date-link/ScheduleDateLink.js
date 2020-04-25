import React, { useState } from 'react'

import Modal from '../modal/Modal'
import styles from './ScheduleDateLink.module.scss'

export default ({ date }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const modal = modalOpen && (
    <Modal
      title='Lesson Schedule Effective Date'
    >
      Hello, modal!
    </Modal>
  )

  return (
    <>
      <span
        className={styles.scheduleDateLink}
        onClick={() => setModalOpen(true)}
      >
        {date}
      </span>
      {modal}
    </>
  )
}
