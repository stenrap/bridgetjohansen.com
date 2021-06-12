import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Head from 'next/head'

import { AppDispatch } from '../store/store'
import { isLoggedIn } from '../store/userSlice'
import { isRequestError, isSigningIn, setRequestError, signIn } from '../store/signInSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { validateEmail, validatePassword } from '../shared/validations/user/user'
import Button from '../ui/components/button/Button'
import Input from '../ui/components/input/Input'
import Nav from '../ui/components/nav/Nav'
import Spinner from '../ui/components/spinner/Spinner'
import Modal from '../ui/modals/Modal'
import styles from '../ui/styles/pages/SignIn.module.scss'

const SignIn = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch()
  const router: NextRouter = useRouter()

  const loggedIn: boolean = useAppSelector(isLoggedIn)
  const requestError: string = useAppSelector(isRequestError)
  const signingIn: boolean = useAppSelector(isSigningIn)

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect((): void => {
    if (loggedIn) {
      router.replace('/', undefined, { shallow: true })
    } else {
      setLoaded(true)
    }
  }, [loggedIn, router, setLoaded])

  if (!loaded) return <></>

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value.toLowerCase())
    setEmailError('')
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
    setPasswordError('')
  }

  const onClickSignIn = (): void => {
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

    dispatch(signIn({ email, password }))
  }

  const onSubmitSignInForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onClickSignIn()
  }

  const onRequestErrorOk = (): void => {
    dispatch(setRequestError(''))
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Nav />
      <div className={styles.signIn}>
        <h1 className='pageHeader'>Sign In</h1>
        <form onSubmit={onSubmitSignInForm}>
          <Input error={emailError} onChange={onChangeEmail} placeholder='Email' type='email' value={email} />
          <Input error={passwordError} onChange={onChangePassword} placeholder='Password' type='password' value={password} />
          <Button disabled={signingIn} kind='primary' onClick={onClickSignIn}>
            {signingIn
              ? <Spinner />
              : 'Sign In'}
          </Button>
        </form>
      </div>
      {requestError
        ? <Modal onOk={onRequestErrorOk} title='Error'>{requestError}</Modal>
        : null
      }
    </>
  )
}

export default SignIn
