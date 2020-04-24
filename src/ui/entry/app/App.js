import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setUser } from '../../store/userSlice'
import Header from '../../components/header/Header'
import Loader from '../../components/loading/Loader'
import requests from '../../Requests'

const Home = lazy(() => import('../../pages/home/Home'))
const About = lazy(() => import('../../pages/about/About'))
const Policies = lazy(() => import('../../pages/policies/Policies'))
const Schedule = lazy(() => import('../../pages/schedule/Schedule'))
const Events = lazy(() => import('../../pages/events/Events'))
const Photos = lazy(() => import('../../pages/photos/Photos'))
const SignIn = lazy(() => import('../../pages/sign-in/SignIn'))

export default () => {
  // We can't use the global loading state because child components
  // will change it and cause an infinite render loop.
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await requests.getUser()
        if (response.data) dispatch(setUser(response.data.getUser))
      } catch (err) {
        // The try block is a best effort to get the current user. If it fails, we still
        // want to render the site as normally as possible.
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [dispatch, setLoading])

  if (loading) return <Loader />

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
