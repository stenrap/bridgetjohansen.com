import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css'

import Calendar from 'react-calendar'
import format from '../../../shared/libs/format'
import Next from '../../svgs/next-black.svg'
import Prev from '../../svgs/prev-black.svg'
import Modal from '../modal/Modal'
import styles from './ScheduleDateLink.module.scss'

export default ({ date }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())

  const next = <img className={styles.navButton} alt='Next' src={Next} />
  const prev = <img className={styles.navButton} alt='Previous' src={Prev} />

  const modal = modalOpen && (
    <Modal
      title='Effective Date'
    >
      <Calendar
        calendarType='US'
        className={styles.calendar}
        minDetail='month'
        navigationLabel={({ date }) => {
          return (
            <span className={styles.monthAndYear}>
              {format.monthAndYear(date)}
            </span>
          )
        }}
        nextLabel={next}
        next2Label={null}
        onChange={date => {
          setCalendarDate(date)
        }}
        prevLabel={prev}
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
