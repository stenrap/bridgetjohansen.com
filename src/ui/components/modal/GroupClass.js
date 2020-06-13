import React, { useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

import {
  createGroupClassDate,
  getGroupClassDates,
  isCreatingGroupClassDate,
  setAddingGroupClassDate,
  setEditingGroupClassDateId
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
    groupClassDate = {}
  } = props

  let initialDate = today.getDate()
  let initialMonth = today.getMonth()
  let initialYear = today.getFullYear()

  if (groupClassDate.id) {
    initialDate = groupClassDate.date
    initialMonth = groupClassDate.month
    initialYear = groupClassDate.year
  }

  if (dupe) {
    return (
      <Modal
        className={styles.dupeModal}
        onOk={() => {
          setDupe(null)
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
      date={initialDate}
      month={initialMonth}
      onCancel={() => {
        batch(() => {
          dispatch(setAddingGroupClassDate(false))
          dispatch(setEditingGroupClassDateId(0))
        })
      }}
      onOk={newDate => {
        const date = newDate.getDate()
        const month = newDate.getMonth()
        const year = newDate.getFullYear()

        for (const groupClassDate of groupClassDates) {
          if (groupClassDate.date === date && groupClassDate.month === month && groupClassDate.year === year) {
            return setDupe({ month, date, year })
          }
        }

        if (groupClassDate.id) {
          console.log('Mutating group class date...')
        } else {
          dispatch(createGroupClassDate({ date, month, year }))
        }
      }}
      title='Add Group Class'
      year={initialYear}
    />
  )
}
