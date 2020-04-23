import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSchedule } from '../../store/scheduleSlice'
import { isSignedIn } from '../../store/userSlice'
import styles from './Schedule.module.scss'

export default () => {
  const dispatch = useDispatch()
  const signedIn = useSelector(isSignedIn)

  useEffect(() => {
    if (!signedIn) return
    dispatch(getSchedule())
  }, [dispatch, signedIn])

  if (!signedIn) return <Redirect to='/sign-in' />

  return (
    <div className={styles.schedule}>
      Hello, schedule!
    </div>
  )
}
