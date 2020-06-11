import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  createGroupClassDate,
  getGroupClassDates,
  isAddingGroupClassDate,
  isCreatingGroupClassDate,
  setAddingGroupClassDate
} from '../../../store/scheduleSlice'
import { date } from '../../../../shared/libs/format'
import DatePicker from '../../modal/DatePicker'
import LoadingModal from '../../loading/LoadingModal'
import Modal from '../../modal/Modal'
import styles from './AddDateLink.module.scss'

export default () => {
  const addingGroupClassDate = useSelector(isAddingGroupClassDate)
  const creatingGroupClassDate = useSelector(isCreatingGroupClassDate)
  const dispatch = useDispatch()
  const groupClassDates = useSelector(getGroupClassDates)
  const today = new Date()

  const [dupe, setDupe] = useState(null)

  const modal = (addingGroupClassDate || dupe) && (
    addingGroupClassDate
      ? (
        <DatePicker
          date={today.getDate()}
          month={today.getMonth()}
          onCancel={() => dispatch(setAddingGroupClassDate(false))}
          onOk={newDate => {
            const date = newDate.getDate()
            const month = newDate.getMonth()
            const year = newDate.getFullYear()

            for (const groupClassDate of groupClassDates) {
              if (groupClassDate.date === date && groupClassDate.month === month && groupClassDate.year === year) {
                dispatch(setAddingGroupClassDate(false))
                setDupe({ month, date, year })
                return
              }
            }

            dispatch(createGroupClassDate({ date, month, year }))
          }}
          title='Add Group Class'
          year={today.getFullYear()}
        />
      )
      : (
        <Modal
          className={styles.dupeModal}
          onOk={() => {
            setDupe(null)
            dispatch(setAddingGroupClassDate(true))
          }}
          showCancel={false}
          title='Duplicate'
        >
          <p className={styles.dupeText}>
            There's already a group class on {date(dupe)}.
          </p>
        </Modal>
      )
  )

  const loadingModal = creatingGroupClassDate && (
    <LoadingModal title='Adding group class...' />
  )

  return (
    <>
      <span
        className={styles.addDateLink}
        onClick={() => dispatch(setAddingGroupClassDate(true))}
      >
        Add Date
      </span>
      {modal}
      {loadingModal}
    </>
  )
}
