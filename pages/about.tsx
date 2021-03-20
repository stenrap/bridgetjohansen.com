import Head from 'next/head'

import { isMenuOpen, toggleMenuOpen } from '../store/navSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

import Nav from '../ui/components/nav/Nav'

const About = (): JSX.Element => {
  // TODO .... Remove this when you have something real to use with Redux. This just demonstrates that you've got it working.
  const menuOpen = useAppSelector(isMenuOpen)
  const dispatch = useAppDispatch()
  console.log('menuOpen on /about is:', menuOpen)

  return (
    <>
      <Head>
        <title>About Bridget</title>
      </Head>
      <Nav />
      <div onClick={(): void => {
        dispatch(toggleMenuOpen(!menuOpen))
      }}>About</div>
    </>
  )
}

export default About

