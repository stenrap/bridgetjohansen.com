import { ChangeEvent, FormEvent, useState } from 'react'
import Head from 'next/head'

import { AppDispatch } from '../store/store'
import {
  getAccountCode,
  getNonce,
  isGettingAccountCode,
  setNonce
} from '../store/userSlice'
import Button from '../ui/components/button/Button'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { validateCode } from '../shared/validations/code/code'
import { validateEmail, validateFirstName, validateLastName, validatePassword } from '../shared/validations/user/user'
import Input from '../ui/components/input/Input'
import Nav from '../ui/components/nav/Nav'
import Nonce from '../shared/types/Nonce'
import Spinner from '../ui/components/spinner/Spinner'
import styles from '../ui/styles/pages/CreateAccount.module.scss'

const CreateAccount = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch()

  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')

  // const [page, setPage] = useState(1)

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const nonce: Nonce | undefined = useAppSelector(getNonce)
  const gettingAccountCode: boolean = useAppSelector(isGettingAccountCode)

  const onChangeCode = (event: ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value)
    setCodeError('')
  }

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value.toLowerCase())
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

    dispatch(getAccountCode(email))
  }

  const onSubmitCreateAccountForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onClickNext()
  }

  const onClickBack = (): void => {
    setCode('')
    dispatch(setNonce())
  }

  const onClickSubmit = (): void => {
    try {
      validateCode(code)
    } catch (err) {
      return setCodeError(err.message)
    }
  }

  const onSubmitEnterCodeForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onClickSubmit()
  }

  /*
    TODO and WYLO .... Wire up the API for submitting the code and creating an account.
   */

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <Nav />
      <div className={styles.createAccount}>
        <h1 className='pageHeader'>{nonce ? 'Enter your code' : 'Create your account'}</h1>
        {nonce && (
          <>
            <div className={styles.codeExplanation}>Please enter the 6-digit code we just emailed to:</div>
            <div className={styles.email}>{email}</div>
          </>
        )}
        {nonce
          ? (
            <>
              <form onSubmit={onSubmitEnterCodeForm}>
                <Input autoFocus={true} error={codeError} key='code' onChange={onChangeCode} placeholder='6-digit code' type='text' value={code} />
              </form>
              <div className={styles.codeButtons}>
                <Button kind='secondary' onClick={onClickBack}>
                  Back
                </Button>
                <Button kind='primary' onClick={onClickSubmit}>
                  Submit
                </Button>
              </div>
            </>
          )
          : (
            <form onSubmit={onSubmitCreateAccountForm}>
              <Input error={firstNameError} onChange={onChangeFirstName} placeholder='First name' type='text' value={firstName} />
              <Input error={lastNameError} onChange={onChangeLastName} placeholder='Last name' type='text' value={lastName} />
              <Input error={emailError} onChange={onChangeEmail} placeholder='Email' type='email' value={email} />
              <Input error={passwordError} onChange={onChangePassword} placeholder='Password' type='password' value={password} />
              <Button className={styles.nextButton} disabled={gettingAccountCode} kind='primary' onClick={onClickNext}>
                {gettingAccountCode
                  ? <Spinner />
                  : 'Next'}
              </Button>
            </form>
          )
        }
      </div>
    </>
  )
}

export default CreateAccount
