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

export interface IsEmailAvailableResponse extends GraphQLError {
  data?: {
    isEmailAvailable: boolean
  }
}

export const isEmailAvailable = (email: string): Promise<IsEmailAvailableResponse> => {
  return query({
    query: `query IsEmailAvailable($email: String!) {
      isEmailAvailable(email: $email)
    }`,
    variables: { email }
  })
}
