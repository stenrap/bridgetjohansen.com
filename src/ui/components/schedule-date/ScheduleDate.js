import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'

import { getNewScheduleDate, getScheduleDate, setNewScheduleDate } from '../../store/scheduleSlice'
import { isAdmin } from '../../store/userSlice'
import format from '../../../shared/libs/format'
import Modal from '../modal/Modal'
import Next from '../../svgs/next-black.svg'
import Prev from '../../svgs/prev-black.svg'
import styles from './ScheduleDate.module.scss'

export default () => {
  const [modalOpen, setModalOpen] = useState(false)

  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const newScheduleDateObj = useSelector(getNewScheduleDate)
  const scheduleDate = useSelector(getScheduleDate)

  const newScheduleDate = new Date()
  newScheduleDate.setMonth(newScheduleDateObj.month)
  newScheduleDate.setDate(newScheduleDateObj.date)
  newScheduleDate.setFullYear(newScheduleDateObj.year)

  const next = <img className={styles.navButton} alt='Next' src={Next} />
  const prev = <img className={styles.navButton} alt='Previous' src={Prev} />

  const modal = modalOpen && (
    <Modal
      onCancel={() => setModalOpen(false)}
      onOk={() => console.log('The new schedule date is:', newScheduleDateObj)}
      title='Effective Date'
    >
      <Calendar
        calendarType='US'
        className={styles.calendar}
        minDetail='month'
        navigationLabel={({ date: labelDate }) => {
          return (
            <span className={styles.monthAndYear}>
              {format.monthAndYear(labelDate)}
            </span>
          )
        }}
        nextLabel={next}
        next2Label={null}
        onChange={newDate => dispatch(setNewScheduleDate({ date: newDate.getDate(), month: newDate.getMonth(), year: newDate.getFullYear() }))}
        prevLabel={prev}
        prev2Label={null}
        showFixedNumberOfWeeks
        tileClassName={styles.calendarDay}
        value={newScheduleDate}
        view='month'
      />
    </Modal>
  )

  const date = scheduleDate.date !== 0 && (
    admin
      ? (
        <>
          <span
            className={styles.scheduleDateLink}
            onClick={() => setModalOpen(true)}
          >
            {format.date(scheduleDate)}
          </span>
          {modal}
        </>
      )
      : format.date(scheduleDate)
  )

  return (
    <div className={styles.scheduleDate}>
      Effective {date}
    </div>
  )
}
