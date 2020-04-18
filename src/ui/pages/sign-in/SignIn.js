import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authenticate } from '../../store/userSlice'
import { isLoading } from '../../store/loadingSlice'
import Loader from '../../components/loading/Loader'
import styles from './SignIn.module.scss'

export default () => {
  const buttonBoxId = 'googleButtonBoxId'
  const dispatch = useDispatch()
  const loading = useSelector(isLoading)

  useEffect(() => {
    window.gapi.signin2.render(buttonBoxId, {
      height: 46,
      longtitle: true,
      onSuccess: googleUser => {
        dispatch(authenticate(googleUser.getAuthResponse().id_token))
      },
      scope: 'email',
      theme: 'dark',
      width: 217
    })
  }, [])

  if (loading) return <Loader />

  return (
    <div
      className={styles.googleButtonBox}
      id={buttonBoxId}
    />
  )
}
