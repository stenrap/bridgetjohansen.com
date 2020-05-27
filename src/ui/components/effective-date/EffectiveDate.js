import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'

import {
  getEffectiveDate,
  getNewEffectiveDate,
  isEditingEffectiveDate,
  isMutatingEffectiveDate,
  setEditingEffectiveDate,
  setNewEffectiveDate,
  updateEffectiveDate
} from '../../store/scheduleSlice'
import { isAdmin } from '../../store/userSlice'
import format from '../../../shared/libs/format'
import LoadingModal from '../loading/LoadingModal'
import Modal from '../modal/Modal'
import Next from '../../svgs/next-black.svg'
import Prev from '../../svgs/prev-black.svg'
import styles from './EffectiveDate.module.scss'

export default () => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const editingEffectiveDate = useSelector(isEditingEffectiveDate)
  const effectiveDate = useSelector(getEffectiveDate)
  const mutatingEffectiveDate = useSelector(isMutatingEffectiveDate)
  const newEffectiveDateObj = useSelector(getNewEffectiveDate)

  const newEffectiveDate = new Date()
  newEffectiveDate.setMonth(newEffectiveDateObj.month)
  newEffectiveDate.setDate(newEffectiveDateObj.date)
  newEffectiveDate.setFullYear(newEffectiveDateObj.year)

  const next = <img className={styles.navButton} alt='Next' src={Next} />
  const prev = <img className={styles.navButton} alt='Previous' src={Prev} />

  const modal = editingEffectiveDate && (
    <Modal
      onCancel={() => dispatch(setEditingEffectiveDate(false))}
      onOk={() => dispatch(updateEffectiveDate(newEffectiveDateObj))}
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
        onChange={newDate => dispatch(setNewEffectiveDate({ date: newDate.getDate(), month: newDate.getMonth(), year: newDate.getFullYear() }))}
        prevLabel={prev}
        prev2Label={null}
        showFixedNumberOfWeeks
        tileClassName={styles.calendarDay}
        value={newEffectiveDate}
        view='month'
      />
    </Modal>
  )

  const loadingModal = mutatingEffectiveDate && (
    <LoadingModal title='Changing effective date...' />
  )

  const date = effectiveDate.date !== 0 && (
    admin
      ? (
        <>
          <span
            className={styles.effectiveDateLink}
            onClick={() => dispatch(setEditingEffectiveDate(true))}
          >
            {format.date(effectiveDate)}
          </span>
          {modal}
        </>
      )
      : format.date(effectiveDate)
  )

  return (
    <div className={styles.effectiveDate}>
      Effective {date}
      {loadingModal}
    </div>
  )
}
