// import React from 'react'
// import logo from './logo.svg'
// import { Counter } from '../../features/counter/Counter'
// import './App.css'

import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('../../pages/home/Home'))
const About = lazy(() => import('../../pages/about/About'))
const Policies = lazy(() => import('../../pages/policies/Policies'))

export default () => {
  // return (
  //   <div className='App'>
  //     <header className='App-header'>
  //       <img src={logo} className='App-logo' alt='logo' />
  //       <Counter />
  //     </header>
  //   </div>
  // )
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/policies' component={Policies} />
        </Switch>
      </Suspense>
    </Router>
  )
}
