import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { authenticate } from '../../store/userSlice'
import styles from './SignIn.module.scss'

export default () => {
  const dispatch = useDispatch()
  const [showSpinner, setShowSpinner] = useState(false)

  const buttonBoxId = 'googleButtonBoxId'

  useEffect(() => {
    window.gapi.signin2.render(buttonBoxId, {
      height: 46,
      longtitle: true,
      onSuccess: googleUser => {
        setShowSpinner(setShowSpinner => !setShowSpinner)
        dispatch(authenticate(googleUser.getAuthResponse().id_token))
      },
      scope: 'email',
      theme: 'dark',
      width: 217
    })
  }, [])

  if (showSpinner) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div
      className={styles.googleButtonBox}
      id={buttonBoxId}
    />
  )
}
