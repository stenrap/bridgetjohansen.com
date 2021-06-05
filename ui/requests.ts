import CreateAccountInput from '../shared/types/CreateAccountInput'
import Nonce from '../shared/types/Nonce'

export interface GraphQLQuery {
  query: string
  variables?: {
    [key: string]: unknown
  }
}

export interface GraphQLError {
  errors?: [{ message: string }]
}

const query = async <T> (query: GraphQLQuery): Promise<T | GraphQLError> => {
  const options: RequestInit = {
    body: JSON.stringify(query),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors'
  }

  try {
    const response: Response = await window.fetch(`${process.env.NEXT_PUBLIC_BRIDGET_API_HOST}/api/graphql`, options)
    return await response.json()
  } catch (err) {
    return { errors: [{ message: 'Please check your network connection and try again.' }] }
  }
}

/* ============ */
/*   Requests   */
/* ============ */

export interface CreateAccountResponse extends GraphQLError {
  data?: {
    createAccount: number
  }
}

export const createAccount = (account: CreateAccountInput): Promise<CreateAccountResponse> => {
  return query({
    query: `mutation CreateAccount($account: CreateAccountInput!) {
      createAccount(account: $account)
    }`,
    variables: { account }
  })
}

export interface NonceResponse extends GraphQLError {
  data?: {
    getAccountCode: Nonce
  }
}

export const getAccountCode = (email: string): Promise<NonceResponse> => {
  return query({
    query: `query GetAccountCode($email: String!) {
      getAccountCode(email: $email) {
        nonce
        type
      }
    }`,
    variables: { email }
  })
}
