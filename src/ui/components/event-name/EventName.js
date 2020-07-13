import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdmin } from '../../store/userSlice'
import { isEditingEventId, setEditingEventId } from '../../store/eventsSlice'
import EventModal from '../modals/EventModal'
import styles from './EventName.module.scss'

export default event => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const editingEventId = useSelector(isEditingEventId)

  const modal = editingEventId === event.id && (
    <EventModal
      event={event}
      onCancel={() => dispatch(setEditingEventId(0))}
    />
  )

  const name = (
    admin
      ? (
        <span
          className={styles.link}
          onClick={() => dispatch(setEditingEventId(event.id))}
        >
          {event.name}
        </span>
      )
      : event.name
  )

  return (
    <div className={styles.name}>
      {name}
      {modal}
    </div>
  )
}
