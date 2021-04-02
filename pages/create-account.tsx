import Head from 'next/head'

import { AppDispatch } from '../store/store'
import { isEmailAvailable } from '../store/userSlice'
import { useAppDispatch } from '../store/hooks'
import Input from '../ui/components/input/Input'
import Nav from '../ui/components/nav/Nav'
import styles from '../ui/styles/pages/CreateAccount.module.scss'

const CreateAccount = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch()

  const onClick = (): void => {
    dispatch(isEmailAvailable('rob.johansen@gmail.com'))
  }

  /*
    TODO and WYLO ....
      2. Put the below form into its own component (maybe CreateAccountStart)
      3. Add state for all the things and update the Input component to support onChange
      4. Implement a CreateAccountVerify component that accepts the 6-digit code for email verification
      5. Wire everything up and create the user!
   */

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <Nav />
      <div className={styles.createAccount}>
        <h1 className='pageHeader' onClick={onClick}>Create your account</h1>
        <Input placeholder='First name' type='text' />
        <Input placeholder='Last name' type='text' />
        <Input placeholder='Email' type='email' />
        <Input placeholder='Password' type='password' />
      </div>
    </>
  )
}

export default CreateAccount
