import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  createGroupClassDate,
  getGroupClassDates,
  isCreatingGroupClassDate,
  setAddingGroupClassDate
} from '../../store/scheduleSlice'
import DatePicker from './DatePicker'
import format from '../../../shared/libs/format'
import LoadingModal from '../loading/LoadingModal'
import Modal from './Modal'
import styles from './GroupClass.module.scss'

export default props => {
  const creatingGroupClassDate = useSelector(isCreatingGroupClassDate)
  const dispatch = useDispatch()
  const groupClassDates = useSelector(getGroupClassDates)
  const today = new Date()

  const [dupe, setDupe] = useState(null)

  const {
    groupClass = {}
  } = props

  if (groupClass.id) {
    console.log('Editing a group class...')
  }

  if (dupe) {
    return (
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
          There's already a group class on {format.date(dupe)}.
        </p>
      </Modal>
    )
  }

  if (creatingGroupClassDate) {
    return <LoadingModal title='Adding group class...' />
  }

  return (
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
}
