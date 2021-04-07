import { ChangeEvent, FocusEvent, useState } from 'react'
import Head from 'next/head'

import { AppDispatch } from '../store/store'
import {
  checkEmail,
  getEmailError,
  isCheckingEmail,
  isEmailAvailable,
  setEmailAvailable,
  setEmailError
} from '../store/userSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { validateEmail } from '../shared/validations/user/user'
import Input from '../ui/components/input/Input'
import Nav from '../ui/components/nav/Nav'
import styles from '../ui/styles/pages/CreateAccount.module.scss'

const CreateAccount = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch()

  const emailAvailable: boolean = useAppSelector(isEmailAvailable)

  const [email, setEmail] = useState('')
  const emailError: string = useAppSelector(getEmailError)

  const [firstName, setFirstName] = useState('')
  // const [firstNameError, setFirstNameError] = useState('')

  const [lastName, setLastName] = useState('')
  // const [lastNameError, setLastNameError] = useState('')

  // const [page, setPage] = useState(1)

  const [password, setPassword] = useState('')
  // const [passwordError, setPasswordError] = useState('')

  const onBlurEmail = (event: FocusEvent<HTMLInputElement>): void => {
    const candidateEmail: string = event.target.value
    if (candidateEmail.length === 0) return

    try {
      validateEmail(candidateEmail)
    } catch (err) {
      dispatch(setEmailError(err.message))
      return
    }

    if (!emailAvailable) {
      dispatch(checkEmail(candidateEmail))
    }
  }

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEmailAvailable(false))
    dispatch(setEmailError(''))
    setEmail(event.target.value)
  }

  if (emailError) {
    console.log(emailError)
  }

  /*
    TODO and WYLO ....
      1. Update the Input component to show a tooltip on error
      2. Don't show the invalid email error on blur. Only show it when the user clicks 'Next'.
      3. Don't check for email availability in this form. If an existing user tries to sign up again, just move them into the reset password flow.
      4. Wire everything up and create the user!
   */

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <Nav />
      <div className={styles.createAccount}>
        <h1 className='pageHeader'>Create your account</h1>
        <Input onChange={(event): void => setFirstName(event.target.value)} placeholder='First name' type='text' value={firstName} />
        <Input onChange={(event): void => setLastName(event.target.value)} placeholder='Last name' type='text' value={lastName} />
        <Input error={emailError} onBlur={onBlurEmail} onChange={onChangeEmail} placeholder='Email' type='email' value={email} />
        <Input onChange={(event): void => setPassword(event.target.value)} placeholder='Password' type='password' value={password} />
      </div>
    </>
  )
}

export default CreateAccount
