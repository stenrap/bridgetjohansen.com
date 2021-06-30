import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { getTokenFromCookie } from '../../api/lib/cookie/cookie'
import { getUser } from '../../api/lib/user/user'
import Layout from '../../ui/components/layout/Layout'
import User from '../../data/models/user/User'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ user: User }>> => {
  const user: User | undefined = await getUser(getTokenFromCookie(context.req))

  if (!user) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  if (!user.studio) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      user
    }
  }
}

const Schedule = (props: { user: User }): JSX.Element => {
  return (
    <Layout signedIn={true} title='Studio Schedule'>
      <div>Schedule</div>
    </Layout>
  )
}

export default Schedule
