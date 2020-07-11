import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchEvents, isFetched } from '../../store/eventsSlice'
import { isAdmin } from '../../store/userSlice'
import AddEventLink from '../../components/add-event-link/AddEventLink'
import Loader from '../../components/loading/Loader'
import styles from './Events.module.scss'

export default () => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const fetched = useSelector(isFetched)

  useEffect(() => {
    if (!fetched) dispatch(fetchEvents())
  }, [fetched, dispatch])

  if (!fetched) return <Loader />

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
