import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { unstable_batchedUpdates } from 'react-dom'

import * as requests from '../ui/requests'
import { validateEmail, validatePassword } from '../shared/validations/user/user'
import Button from '../ui/components/button/Button'
import Input from '../ui/components/input/Input'
import Layout from '../ui/components/layout/Layout'
import Spinner from '../ui/components/spinner/Spinner'
import Modal from '../ui/modals/Modal'
import styles from '../ui/styles/pages/SignIn.module.scss'

const SignIn = (): JSX.Element => {
  const mounted = useRef(false)
  const router: NextRouter = useRouter()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [requestError, setRequestError] = useState('')

  useEffect((): () => void => {
    mounted.current = true
    return (): void => { mounted.current = false }
  }, [])

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value.toLowerCase())
    setEmailError('')
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
    setPasswordError('')
  }

  const onClickSignIn = async (): Promise<void> => {
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

    setLoading(true)
    const { data, errors }: requests.SignInResponse = await requests.signIn({ email, password })
    if (!mounted.current) return

    if (data) {
      router.push('/')
    } else {
      unstable_batchedUpdates((): void => {
        setLoading(false)
        setRequestError(errors ? errors[0].message : 'Please check your network connection and try again.')
      })
    }
  }

  const onSubmitSignInForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onClickSignIn()
  }

  const onRequestErrorOk = (): void => {
    setRequestError('')
  }

  return (
    <Layout signedIn={false} title='Sign In'>
      <div className={styles.signIn}>
        <h1 className='pageHeader'>Sign In</h1>
        <form onSubmit={onSubmitSignInForm}>
          <Input error={emailError} onChange={onChangeEmail} placeholder='Email' type='email' value={email} />
          <Input error={passwordError} onChange={onChangePassword} placeholder='Password' type='password' value={password} />
          <Button disabled={loading} kind='primary' onClick={onClickSignIn}>
            {loading
              ? <Spinner />
              : 'Sign In'}
          </Button>
        </form>
      </div>
      {requestError
        ? <Modal onOk={onRequestErrorOk} title='Error'>{requestError}</Modal>
        : null
      }
    </Layout>
  )
}

export default SignIn
