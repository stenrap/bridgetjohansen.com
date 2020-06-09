import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'

import format from '../../../shared/libs/format'
import Modal from './Modal'
import Next from '../../svgs/next-black.svg'
import Prev from '../../svgs/prev-black.svg'
import styles from './DatePicker.module.scss'

export default props => {
  const [date, setDate] = useState(props.date)
  const [month, setMonth] = useState(props.month)
  const [year, setYear] = useState(props.year)

  const next = <img className={styles.navButton} alt='Next' src={Next} />
  const prev = <img className={styles.navButton} alt='Previous' src={Prev} />

  const currentDate = new Date()
  currentDate.setDate(date)
  currentDate.setMonth(month)
  currentDate.setFullYear(year)

  return (
    <Modal
      onCancel={props.onCancel}
      onOk={() => props.onOk(currentDate)}
      title={props.title}
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
        onChange={newDate => {
          // Since these state updates occur in a React-based event handler,
          // they will be batched so as not to trigger multiple UI renders.
          // https://github.com/facebook/react/issues/14259#issuecomment-439632622
          setDate(newDate.getDate())
          setMonth(newDate.getMonth())
          setYear(newDate.getFullYear())
        }}
        prevLabel={prev}
        prev2Label={null}
        showFixedNumberOfWeeks
        tileClassName={styles.calendarDay}
        value={currentDate}
        view='month'
      />
    </Modal>
  )
}
