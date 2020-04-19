import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { isSignedIn } from '../../store/userSlice'

export default () => {
  const signedIn = useSelector(isSignedIn)

  if (!signedIn) return <Redirect to='/sign-in' />

  return (
    <div>Hello, schedule!</div>
  )
}
