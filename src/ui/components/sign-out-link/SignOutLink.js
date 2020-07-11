import React from 'react'
import { batch, useDispatch } from 'react-redux'

import { setFetched } from '../../store/scheduleSlice'
import { signOut } from '../../store/userSlice'
import styles from './SignOutLink.module.scss'

export default () => {
  const dispatch = useDispatch()

  return (
    <span
      className={styles.signOutLink}
      onClick={() => {
        batch(() => {
          dispatch(setFetched(false)) // Make the schedule page render the loader.
          dispatch(signOut())
        })
      }}
    >
      Sign Out
    </span>
  )
}
