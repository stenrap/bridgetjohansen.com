import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from '../../components/header/Header'
import Loader from '../../components/loading/Loader'
// import logo from './logo.svg'

const Home = lazy(() => import('../../pages/home/Home'))
const About = lazy(() => import('../../pages/about/About'))
const Policies = lazy(() => import('../../pages/policies/Policies'))
const Schedule = lazy(() => import('../../pages/schedule/Schedule'))
const Events = lazy(() => import('../../pages/events/Events'))
const Photos = lazy(() => import('../../pages/photos/Photos'))
const SignIn = lazy(() => import('../../pages/sign-in/SignIn'))

export default () => {
  // return (
  //   <img src={logo} className='App-logo' alt='logo' />
  // )

  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/policies' component={Policies} />
          <Route path='/schedule' component={Schedule} />
          <Route path='/events' component={Events} />
          <Route path='/photos' component={Photos} />
          <Route path='/sign-in' component={SignIn} />
        </Switch>
      </Suspense>
    </Router>
  )
}
