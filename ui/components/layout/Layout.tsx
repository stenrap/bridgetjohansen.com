import { PropsWithChildren } from 'react'
import Head from 'next/head'

import LayoutProps from './LayoutProps'
import Nav from '../nav/Nav'

const Layout = (props: PropsWithChildren<LayoutProps>): JSX.Element => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Nav signedIn={props.signedIn} />
      {props.children}
    </>
  )
}

export default Layout
