import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  createGroupClassDate,
  isAddingGroupClassDate,
  isCreatingGroupClassDate,
  setAddingGroupClassDate
} from '../../../store/scheduleSlice'
import DatePicker from '../../modal/DatePicker'
import LoadingModal from '../../loading/LoadingModal'
import styles from './AddDateLink.module.scss'

export default () => {
  const addingGroupClassDate = useSelector(isAddingGroupClassDate)
  const creatingGroupClassDate = useSelector(isCreatingGroupClassDate)
  const dispatch = useDispatch()
  const today = new Date()

  const modal = addingGroupClassDate && (
    <DatePicker
      date={today.getDate()}
      month={today.getMonth()}
      onCancel={() => dispatch(setAddingGroupClassDate(false))}
      onOk={date => dispatch(createGroupClassDate({ date: date.getDate(), month: date.getMonth(), year: date.getFullYear() }))}
      title='Add Group Class Date'
      year={today.getFullYear()}
    />
  )

  const loadingModal = creatingGroupClassDate && (
    <LoadingModal title='Adding group class date...' />
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
