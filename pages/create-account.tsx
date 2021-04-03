import { ChangeEvent, useState } from 'react'
import Head from 'next/head'

import { AppDispatch } from '../store/store'
import { isEmailAvailable } from '../store/userSlice'
import { useAppDispatch } from '../store/hooks'
import Input from '../ui/components/input/Input'
import Nav from '../ui/components/nav/Nav'
import styles from '../ui/styles/pages/CreateAccount.module.scss'

const CreateAccount = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  // const [emailError, setEmailError] = useState('')

  const [firstName, setFirstName] = useState('')
  // const [firstNameError, setFirstNameError] = useState('')

  const [lastName, setLastName] = useState('')
  // const [lastNameError, setLastNameError] = useState('')

  // const [page, setPage] = useState(1)

  const [password, setPassword] = useState('')
  // const [passwordError, setPasswordError] = useState('')

  const checkEmail = (): void => {
    // TODO and WYLO 1 .... You should only dispatch if you haven't already checked whether the email is available.
    //                      So you'll need a global state property for whether the email is available.
    //                      You'll also eventually need to disable the 'Next' button (or the form submit--should this be a form?) while checking the email
    dispatch(isEmailAvailable(email))
  }

  /*
    TODO and WYLO ....
      2. Put the below form into its own component (maybe CreateAccountStart)
      3. Implement a CreateAccountVerify component that accepts the 6-digit code for email verification
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
        <Input onBlur={checkEmail} onChange={(event: ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value)} placeholder='Email' type='email' value={email} />
        <Input onChange={(event): void => setPassword(event.target.value)} placeholder='Password' type='password' value={password} />
      </div>
    </>
  )
}

export default CreateAccount
