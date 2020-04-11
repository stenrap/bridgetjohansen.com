import React, { useEffect, useState } from 'react'

import styles from './SignIn.module.scss'

export default () => {
  const [showSpinner, setShowSpinner] = useState(false)

  const buttonBoxId = 'googleButtonBoxId'

  useEffect(() => {
    window.gapi.signin2.render(buttonBoxId, {
      height: 46,
      longtitle: true,
      onSuccess: googleUser => {
        setShowSpinner(setShowSpinner => !setShowSpinner)
        console.log(`Logged in as: ${googleUser.getBasicProfile().getEmail()}`)
        console.log(`The id token to send to the back end is: ${googleUser.getAuthResponse().id_token}`)
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
