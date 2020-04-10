import React, { useEffect } from 'react'

import styles from './SignIn.module.scss'

export default () => {
  const buttonBoxId = 'googleButtonBoxId'

  useEffect(() => {
    window.gapi.signin2.render(buttonBoxId, {
      height: 46,
      longtitle: true,
      onSuccess: googleUser => {
        console.log(`Logged in as: ${googleUser.getBasicProfile().getEmail()}`)
        console.log(`The id token to send to the back end is: ${googleUser.getAuthResponse().id_token}`)
      },
      scope: 'email',
      width: 217
    })
  }, [])

  return (
    <div
      className={styles.googleButtonBox}
      id={buttonBoxId}
    />
  )
}
