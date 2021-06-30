import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { getTokenFromCookie } from '../api/lib/cookie/cookie'
import { getUser } from '../api/lib/user/user'
import Layout from '../ui/components/layout/Layout'
import User from '../data/models/user/User'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ signedIn: boolean }>> => {
  const user: User | undefined = await getUser(getTokenFromCookie(context.req))

  return {
    props: {
      signedIn: !!user
    }
  }
}

const About = (props: { signedIn: boolean }): JSX.Element => {
  return (
    <Layout signedIn={props.signedIn} title='About Bridget'>
      <div>About</div>
    </Layout>
  )
}

export default About
