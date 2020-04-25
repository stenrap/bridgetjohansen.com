import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css'

import Calendar from 'react-calendar'
import Modal from '../modal/Modal'
import styles from './ScheduleDateLink.module.scss'

export default ({ date }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())

  const modal = modalOpen && (
    <Modal
      title='Schedule Effective Date'
    >
      <Calendar
        calendarType='US'
        className={styles.calendar}
        minDate={new Date()}
        minDetail='month'
        next2Label={null}
        onChange={date => {
          setCalendarDate(date)
        }}
        prev2Label={null}
        showFixedNumberOfWeeks
        tileClassName={styles.calendarDay}
        value={calendarDate}
        view='month'
      />
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
