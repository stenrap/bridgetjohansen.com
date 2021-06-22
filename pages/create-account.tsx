import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { unstable_batchedUpdates } from 'react-dom'

import * as requests from '../ui/requests'
import { validateCode } from '../shared/validations/code/code'
import { validateEmail, validateFirstName, validateLastName, validatePassword } from '../shared/validations/user/user'
import Button from '../ui/components/button/Button'
import Input from '../ui/components/input/Input'
import Layout from '../ui/components/layout/Layout'
import Modal from '../ui/modals/Modal'
import Nonce from '../shared/types/Nonce'
import Spinner from '../ui/components/spinner/Spinner'
import styles from '../ui/styles/pages/CreateAccount.module.scss'

const CreateAccount = (): JSX.Element => {
  const mounted = useRef(false)
  const router: NextRouter = useRouter()

  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [loading, setLoading] = useState(false)
  const [nonce, setNonce] = useState<Nonce | undefined>(undefined)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [requestError, setRequestError] = useState('')

  useEffect((): () => void => {
    mounted.current = true
    return (): void => { mounted.current = false }
  }, [])

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

  const onClickNext = async (): Promise<void> => {
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

    setLoading(true)
    const { data, errors }: requests.NonceResponse = await requests.getAccountCode(email)
    if (!mounted.current) return

    if (data) {
      unstable_batchedUpdates((): void => {
        setLoading(false)
        setNonce(data.getAccountCode)
      })
    } else {
      unstable_batchedUpdates((): void => {
        setLoading(false)
        setRequestError(errors ? errors[0].message : 'Please check your network connection and try again.')
      })
    }
  }

  const onSubmitCreateAccountForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onClickNext()
  }

  const onClickBack = (): void => {
    setCode('')
    setNonce(undefined)
  }

  const onClickSubmit = async (): Promise<void> => {
    try {
      validateCode(code)
    } catch (err) {
      return setCodeError(err.message)
    }

    setLoading(true)
    const { data, errors }: requests.CreateAccountResponse = await requests.createAccount({
      code,
      email,
      firstName,
      lastName,
      // The form and submit button can't even be visible if the nonce is undefined, so we disable the non-null assertion warning.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      nonce: nonce!.nonce,
      password
    })
    if (!mounted.current) return

    if (data) {
      router.replace('/')
    } else {
      unstable_batchedUpdates((): void => {
        setLoading(false)
        setRequestError(errors ? errors[0].message : 'Please check your network connection and try again.')
      })
    }
  }

  const onSubmitEnterCodeForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onClickSubmit()
  }

  const onRequestErrorOk = (): void => {
    setRequestError('')
  }

  return (
    <Layout signedIn={false} title='Create Account'>
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
                <Button disabled={loading} kind='primary' onClick={onClickSubmit}>
                  {loading
                    ? <Spinner />
                    : 'Submit'}
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
              <Button className={styles.nextButton} disabled={loading} kind='primary' onClick={onClickNext}>
                {loading
                  ? <Spinner />
                  : 'Next'}
              </Button>
            </form>
          )
        }
      </div>
      {requestError
        ? <Modal onOk={onRequestErrorOk} title='Error'>{requestError}</Modal>
        : null
      }
    </Layout>
  )
}

export default CreateAccount
