import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'

import {
  getNewScheduleDate,
  getScheduleDate,
  isMutatingScheduleDate,
  isScheduleDateModalOpen,
  mutateScheduleDate,
  setNewScheduleDate,
  setScheduleDateModalOpen
} from '../../store/scheduleSlice'
import { isAdmin } from '../../store/userSlice'
import format from '../../../shared/libs/format'
import LoadingModal from '../loading/LoadingModal'
import Modal from '../modal/Modal'
import Next from '../../svgs/next-black.svg'
import Prev from '../../svgs/prev-black.svg'
import styles from './ScheduleDate.module.scss'

export default () => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const modalOpen = useSelector(isScheduleDateModalOpen)
  const mutatingScheduleDate = useSelector(isMutatingScheduleDate)
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
      onCancel={() => dispatch(setScheduleDateModalOpen(false))}
      onOk={() => dispatch(mutateScheduleDate(newScheduleDateObj))}
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

  const loadingModal = mutatingScheduleDate && (
    <LoadingModal title='Changing effective date...' />
  )

  const date = scheduleDate.date !== 0 && (
    admin
      ? (
        <>
          <span
            className={styles.scheduleDateLink}
            onClick={() => dispatch(setScheduleDateModalOpen(true))}
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
      {loadingModal}
    </div>
  )
}
