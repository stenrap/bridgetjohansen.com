import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getEffectiveDate,
  isEditingEffectiveDate,
  isMutatingEffectiveDate,
  setEditingEffectiveDate,
  updateEffectiveDate
} from '../../store/scheduleSlice'
import { isAdmin } from '../../store/userSlice'
import DatePicker from '../modals/DatePicker'
import format from '../../../shared/libs/format'
import LoadingModal from '../loading/LoadingModal'
import styles from './EffectiveDate.module.scss'

export default () => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const editingEffectiveDate = useSelector(isEditingEffectiveDate)
  const effectiveDate = useSelector(getEffectiveDate)
  const mutatingEffectiveDate = useSelector(isMutatingEffectiveDate)

  const modal = editingEffectiveDate && (
    <DatePicker
      date={effectiveDate.date}
      month={effectiveDate.month}
      onCancel={() => dispatch(setEditingEffectiveDate(false))}
      onOk={date => dispatch(updateEffectiveDate({ date: date.getDate(), month: date.getMonth(), year: date.getFullYear() }))}
      title='Effective Date'
      year={effectiveDate.year}
    />
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
