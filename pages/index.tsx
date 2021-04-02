import Head from 'next/head'

import Nav from '../ui/components/nav/Nav'

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Bridget Johansen</title>
      </Head>
      <Nav />
      <div>Home</div>
    </>
  )
}

export default Home
