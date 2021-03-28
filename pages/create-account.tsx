import Head from 'next/head'
import { inspect } from 'util'

import Input from '../ui/components/input/Input'
import Nav from '../ui/components/nav/Nav'
import styles from '../ui/styles/pages/CreateAccount.module.scss'

const CreateAccount = (): JSX.Element => {
  const fetchUsers = async (): Promise<void> => {
    let response = await fetch('https://local.bridgetjohansen.com:3000/api/graphql', {
      body: JSON.stringify({
        query: `query Users {
          users {
            name
          }
        }`
      }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors'
    })
    response = await response.json()
    console.log('The response is:', inspect(response, { depth: null }))
  }

  const onClick = (): void => {
    fetchUsers()
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <Nav />
      <div className={styles.createAccount}>
        <h1 className='pageHeader' onClick={onClick}>Create your account</h1>
        <Input placeholder='Email' type='email' />
        <Input placeholder='Password' type='password' />
      </div>
    </>
  )
}

export default CreateAccount
