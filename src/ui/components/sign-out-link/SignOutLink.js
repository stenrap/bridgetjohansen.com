import React from 'react'
import { useDispatch } from 'react-redux'

import { signOut } from '../../store/userSlice'
import styles from './SignOutLink.module.scss'

export default () => {
  const dispatch = useDispatch()

  return (
    <span
      className={styles.signOutLink}
      onClick={() => dispatch(signOut())}
    >
      Sign Out
    </span>
  )
}
