import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSchedule } from '../../store/scheduleSlice'
import { isSignedIn } from '../../store/userSlice'
import ScheduleDate from '../../components/schedule-date/ScheduleDate'
import SignOutLink from '../../components/sign-out-link/SignOutLink'
import styles from './Schedule.module.scss'

export default () => {
  const dispatch = useDispatch()
  const signedIn = useSelector(isSignedIn)

  useEffect(() => {
    if (!signedIn) return
    dispatch(fetchSchedule())
  }, [dispatch, signedIn])

  if (!signedIn) return <Redirect to='/sign-in' />

  return (
    <div className={styles.schedule}>
      <div className={styles.scheduleHeader}>
        <div>
          <div className={styles.scheduleTitle}>Lesson Schedule</div>
          <ScheduleDate />
        </div>
        <SignOutLink />
      </div>
    </div>
  )
}
