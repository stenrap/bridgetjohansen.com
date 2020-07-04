import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAddingEvent, setAddingEvent } from '../../store/eventsSlice'
import styles from './AddEventLink.module.scss'

export default () => {
  const addingEvent = useSelector(isAddingEvent)
  const dispatch = useDispatch()

  if (addingEvent) {
    console.log('Adding an event...')
  }

  return (
    <>
      <span
        className={styles.addEventLink}
        onClick={() => dispatch(setAddingEvent(true))}
      >
        Add Event
      </span>
    </>
  )
}
