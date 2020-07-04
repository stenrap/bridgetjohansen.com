import React from 'react'
import { useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import AddEventLink from '../../components/add-event-link/AddEventLink'
import styles from './Events.module.scss'

export default () => {
  const admin = useSelector(isAdmin)

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
