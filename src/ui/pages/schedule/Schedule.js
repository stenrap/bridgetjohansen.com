import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { isSignedIn } from '../../store/userSlice'
import styles from './Schedule.module.scss'

export default () => {
  const signedIn = useSelector(isSignedIn)

  if (!signedIn) return <Redirect to='/sign-in' />

  return (
    <div className={styles.schedule}>
      Hello, schedule!
    </div>
  )
}
