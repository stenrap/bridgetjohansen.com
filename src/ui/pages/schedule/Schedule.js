import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { isAuthenticated } from '../../store/userSlice'

export default () => {
  if (!useSelector(isAuthenticated)) return <Redirect to='/sign-in' />

  return (
    <div>Hello, schedule!</div>
  )
}
