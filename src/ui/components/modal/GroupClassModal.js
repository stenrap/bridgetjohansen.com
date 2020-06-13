import React, { useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

import {
  getGroupClasses,
  isMutatingGroupClass,
  mutateGroupClass,
  setAddingGroupClass,
  setEditingGroupClassId
} from '../../store/scheduleSlice'
import DatePicker from './DatePicker'
import format from '../../../shared/libs/format'
import LoadingModal from '../loading/LoadingModal'
import Modal from './Modal'
import styles from './GroupClassModal.module.scss'

export default props => {
  const dispatch = useDispatch()
  const groupClasses = useSelector(getGroupClasses)
  const mutatingGroupClass = useSelector(isMutatingGroupClass)
  const today = new Date()

  const [dupe, setDupe] = useState(null)

  const {
    groupClass = {}
  } = props

  let initialDate = today.getDate()
  let initialMonth = today.getMonth()
  let initialYear = today.getFullYear()

  if (groupClass.id) {
    initialDate = groupClass.date
    initialMonth = groupClass.month
    initialYear = groupClass.year
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

  if (mutatingGroupClass) {
    return <LoadingModal title={`${groupClass.id ? 'Editing' : 'Adding'} group class...`} />
  }

  return (
    <DatePicker
      date={initialDate}
      month={initialMonth}
      onCancel={() => {
        batch(() => {
          dispatch(setAddingGroupClass(false))
          dispatch(setEditingGroupClassId(0))
        })
      }}
      onDelete={() => {
        console.log(`Deleting group class with id ${groupClass.id}`)
      }}
      onOk={newDate => {
        const date = newDate.getDate()
        const month = newDate.getMonth()
        const year = newDate.getFullYear()

        for (const groupClass of groupClasses) {
          if (groupClass.date === date && groupClass.month === month && groupClass.year === year) {
            return setDupe({ month, date, year })
          }
        }

        dispatch(mutateGroupClass({ id: groupClass.id, date, month, year }))
      }}
      showDelete={groupClass.id}
      title={`${groupClass.id ? 'Edit' : 'Add'} Group Class`}
      year={initialYear}
    />
  )
}
