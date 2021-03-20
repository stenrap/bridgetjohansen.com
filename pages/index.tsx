import Head from 'next/head'

import { isMenuOpen } from '../store/navSlice'
import { useAppSelector } from '../store/hooks'

import Nav from '../ui/components/nav/Nav'

const Home = (): JSX.Element => {
  // TODO .... Remove this when you have something real to use with Redux. This just demonstrates that you've got it working.
  const menuOpen = useAppSelector(isMenuOpen)
  console.log('menuOpen on / is:', menuOpen)

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
