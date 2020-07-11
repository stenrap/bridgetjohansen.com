import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchEvents } from '../../store/eventsSlice'
import { isAdmin } from '../../store/userSlice'
import { isLoading } from '../../store/loadingSlice'
import AddEventLink from '../../components/add-event-link/AddEventLink'
import Loader from '../../components/loading/Loader'
import styles from './Events.module.scss'

export default () => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const loading = useSelector(isLoading)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  if (loading) return <Loader />

  const addEventRow = admin && (
    <div className={styles.addEventRow}>
      <AddEventLink />
    </div>
  )

  return (
    <>
      <div className={styles.banner} />
      <div className={styles.events}>
        <div className={styles.eventsHeader}>
          Events
        </div>
        {addEventRow}
      </div>
    </>
  )
}
