import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { isSignedIn, isSigningIn, signIn } from '../../store/userSlice'
import Loader from '../../components/loading/Loader'
import styles from './SignIn.module.scss'

export default () => {
  const buttonBoxId = 'googleButtonBoxId'
  const dispatch = useDispatch()
  const signedIn = useSelector(isSignedIn)
  const signingIn = useSelector(isSigningIn)

  useEffect(() => {
    window.gapi.signin2.render(buttonBoxId, {
      height: 46,
      longtitle: true,
      onSuccess: googleUser => {
        dispatch(signIn(googleUser.getAuthResponse().id_token))
      },
      scope: 'email',
      theme: 'dark',
      width: 217
    })
  }, [dispatch])

  if (signingIn) return <Loader />

  if (signedIn) return <Redirect to='/schedule' />

  return (
    <div
      className={styles.googleButtonBox}
      id={buttonBoxId}
    />
  )
}
