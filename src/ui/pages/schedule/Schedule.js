import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AddStudent from '../../components/add-student/AddStudent'
import EffectiveDate from '../../components/effective-date/EffectiveDate'
import { fetchSchedule } from '../../store/scheduleSlice'
import { isAdmin, isSignedIn } from '../../store/userSlice'
import SignOutLink from '../../components/sign-out-link/SignOutLink'
import styles from './Schedule.module.scss'

export default () => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const signedIn = useSelector(isSignedIn)

  useEffect(() => {
    if (!signedIn) return
    dispatch(fetchSchedule())
  }, [dispatch, signedIn])

  if (!signedIn) return <Redirect to='/sign-in' />

  const addStudentRow = admin && (
    <div className={styles.addStudentRow}>
      <AddStudent />
    </div>
  )

  return (
    <div className={styles.schedule}>
      <div className={styles.scheduleHeader}>
        <div>
          <div className={styles.scheduleTitle}>Lesson Schedule</div>
          <EffectiveDate />
        </div>
        <SignOutLink />
      </div>
      {addStudentRow}
    </div>
  )
}
