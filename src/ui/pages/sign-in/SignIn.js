import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isLoading } from '../../store/loadingSlice'
import Loader from '../../components/loading/Loader'
import { signIn } from '../../store/userSlice'
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
        dispatch(signIn(googleUser.getAuthResponse().id_token))
      },
      scope: 'email',
      theme: 'dark',
      width: 217
    })
  }, [dispatch])

  if (loading) return <Loader />

  return (
    <div
      className={styles.googleButtonBox}
      id={buttonBoxId}
    />
  )
}
