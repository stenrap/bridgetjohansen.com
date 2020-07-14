import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  deleteEvent,
  isConfirmingDeleteEventId,
  isDeletingEventId,
  setConfirmingDeleteEventId
} from '../../store/eventsSlice'
import EventName from '../event-name/EventName'
import LoadingModal from '../loading/LoadingModal'
import Modal from '../modals/Modal'
import styles from './Event.module.scss'

export default event => {
  const confirmingDeleteEventId = useSelector(isConfirmingDeleteEventId)
  const deletingEventId = useSelector(isDeletingEventId)
  const dispatch = useDispatch()

  const confirmingDeleteEvent = confirmingDeleteEventId === event.id
  const deletingEvent = deletingEventId === event.id

  const deleteModal = (confirmingDeleteEvent || deletingEvent) && (
    deletingEvent
      ? (
        <LoadingModal title={`Deleting ${event.name}...`} />
      )
      : (
        <Modal
          cancelLabel='No'
          okLabel='Yes'
          onCancel={() => dispatch(setConfirmingDeleteEventId(0))}
          onOk={() => dispatch(deleteEvent(event.id))}
          title='Delete Event'
        >
          Are you sure you want to delete the "{event.name}" event?
        </Modal>
      )
  )

  return (
    <div className={styles.event}>
      <EventName {...event} />
      <div className={styles.location}>{event.location}</div>
      <div className={styles.dateAndTime}>{event.dateAndTime}</div>
      {deleteModal}
    </div>
  )
}
