import { ChangeEvent, useState } from 'react'
import Head from 'next/head'

// import { AppDispatch } from '../store/store'
// import {
//   checkEmail,
//   getEmailError,
//   isCheckingEmail,
//   isEmailAvailable,
//   setEmailAvailable,
//   setEmailError
// } from '../store/userSlice'
import Button from '../ui/components/button/Button'
// import { useAppDispatch, useAppSelector } from '../store/hooks'
import { validateEmail, validateFirstName, validateLastName, validatePassword } from '../shared/validations/user/user'
import Input from '../ui/components/input/Input'
import Nav from '../ui/components/nav/Nav'
import styles from '../ui/styles/pages/CreateAccount.module.scss'

const CreateAccount = (): JSX.Element => {
  // const dispatch: AppDispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')

  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')

  // const [page, setPage] = useState(1)

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
    setEmailError('')
  }

  const onChangeFirstName = (event: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value)
    setFirstNameError('')
  }

  const onChangeLastName = (event: ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value)
    setLastNameError('')
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
    setPasswordError('')
  }

  const onClickNext = (): void => {
    try {
      validateFirstName(firstName)
    } catch (err) {
      return setFirstNameError(err.message)
    }

    try {
      validateLastName(lastName)
    } catch (err) {
      return setLastNameError(err.message)
    }

    try {
      validateEmail(email)
    } catch (err) {
      return setEmailError(err.message)
    }

    try {
      validatePassword(password)
    } catch (err) {
      return setPasswordError(err.message)
    }
  }

  /*
    TODO and WYLO ....
      1. Flesh out the flow for the api that creates a 6-digit code during account creation:
        a) The api checks to see if the user already exists (and if so, puts the user into the password reset flow...eventually)
        b) The api generates a 6-digit code and a nonce
        c) The api sets a key-value pair in redis (expiring in 10 minutes), where key is nonce and value is 6-digit code
        d) The api returns an object that includes the nonce, and some property that helps the client understand which flow the user is in (account creation or password reset)
        e) ...
      2. Implement the above api and create a 6-digit code for the user!
   */

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <Nav />
      <div className={styles.createAccount}>
        <h1 className='pageHeader'>Create your account</h1>
        <Input error={firstNameError} onChange={onChangeFirstName} placeholder='First name' type='text' value={firstName} />
        <Input error={lastNameError} onChange={onChangeLastName} placeholder='Last name' type='text' value={lastName} />
        <Input error={emailError} onChange={onChangeEmail} placeholder='Email' type='email' value={email} />
        <Input error={passwordError} onChange={onChangePassword} placeholder='Password' type='password' value={password} />
        <Button kind='primary' onClick={onClickNext}>
          Next
        </Button>
      </div>
    </>
  )
}

export default CreateAccount
