import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { isLoading } from '../../store/loadingSlice'
import { isSignedIn, signIn } from '../../store/userSlice'
import Loader from '../../components/loading/Loader'
import styles from './SignIn.module.scss'

export default () => {
  const buttonBoxId = 'googleButtonBoxId'
  const dispatch = useDispatch()
  const loading = useSelector(isLoading)
  const signedIn = useSelector(isSignedIn)

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

  if (loading) return <Loader />

  if (signedIn) return <Redirect to='/schedule' />

  return (
    <div
      className={styles.googleButtonBox}
      id={buttonBoxId}
    />
  )
}
