import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAddingEvent, setAddingEvent } from '../../store/eventsSlice'
import EventModal from '../modals/EventModal'
import styles from './AddEventLink.module.scss'

export default () => {
  const addingEvent = useSelector(isAddingEvent)
  const dispatch = useDispatch()

  const modal = addingEvent && (
    <EventModal
      onCancel={() => dispatch(setAddingEvent(false))}
    />
  )

  return (
    <>
      <span
        className={styles.addEventLink}
        onClick={() => dispatch(setAddingEvent(true))}
      >
        Add Event
      </span>
      {modal}
    </>
  )
}
