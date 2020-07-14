import React, { useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

import { isMutatingEvent, mutateEvent, setConfirmingDeleteEventId, setEditingEventId } from '../../store/eventsSlice'
import { isValidString } from '../../../shared/libs/validation'
import Button from '../button/Button'
import DatePicker from './DatePicker'
import format from '../../../shared/libs/format'
import LoadingModal from '../loading/LoadingModal'
import Modal from './Modal'
import styles from './EventModal.module.scss'

export default props => {
  const dispatch = useDispatch()
  const mutatingEvent = useSelector(isMutatingEvent)

  const {
    event = {}
  } = props

  const startingExpiration = event.expiration ? new Date(event.expiration) : event.expiration

  // Events must expire in the future, so we default to expiring them tomorrow.
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0)
  tomorrow.setMinutes(0)
  tomorrow.setSeconds(0)
  tomorrow.setMilliseconds(0)

  const [choosingExpiration, setChoosingExpiration] = useState(false)
  const [dateAndTime, setDateAndTime] = useState(event.dateAndTime || '')
  const [dateAndTimeError, setdateAndTimeError] = useState(false)
  const [expiration, setExpiration] = useState(startingExpiration || tomorrow)
  const [expirationError, setExpirationError] = useState(false)
  const [location, setLocation] = useState(event.location || '')
  const [locationError, setLocationError] = useState(false)
  const [name, setName] = useState(event.name || '')
  const [nameError, setNameError] = useState(false)

  if (mutatingEvent) {
    return <LoadingModal title={`${event.id ? 'Updating' : 'Adding'} event...`} />
  } else {
    if (choosingExpiration) {
      return (
        <DatePicker
          date={expiration.getDate()}
          month={expiration.getMonth()}
          onCancel={() => setChoosingExpiration(false)}
          onOk={date => {
            date.setHours(0)
            date.setMinutes(0)
            date.setSeconds(0)
            date.setMilliseconds(0)
            setExpiration(date)
            setExpirationError(false)
            setChoosingExpiration(false)
          }}
          title='Event Expiration'
          year={expiration.getFullYear()}
        />
      )
    }

    return (
      <Modal
        className={styles.eventModal}
        onOk={() => {
          if (!isValidString(name)) return setNameError(true)
          if (!isValidString(dateAndTime)) return setdateAndTimeError(true)
          if (!isValidString(location)) return setLocationError(true)
          if (expiration.getTime() < tomorrow.getTime()) return setExpirationError(true)

          dispatch(mutateEvent({
            dateAndTime,
            expiration: expiration.getTime().toString(), // GraphQL integers are 32-bit, so we do this little dance.
            id: event.id,
            location,
            name
          }))
        }}
        title={`${event.id ? 'Edit' : 'Add'} Event`}
        {...props}
      >
        {event.id && (
          <Button
            className={styles.deleteButton}
            onClick={() => {
              batch(() => {
                dispatch(setEditingEventId(0))
                dispatch(setConfirmingDeleteEventId(event.id))
              })
            }}
          >
            Delete
          </Button>
        )}
        <div className='inputRow'>
          <label>Name</label>
          <input
            className={nameError ? 'error' : undefined}
            onChange={event => {
              setName(event.target.value)
              setNameError(false)
            }}
            type='text'
            value={name}
          />
        </div>
        <div className='inputRow'>
          <label>Location</label>
          <input
            className={locationError ? 'error' : undefined}
            onChange={event => {
              setLocation(event.target.value)
              setLocationError(false)
            }}
            type='text'
            value={location}
          />
        </div>
        <div className='inputRow'>
          <label>Date & Time</label>
          <input
            className={dateAndTimeError ? 'error' : undefined}
            onChange={event => {
              setDateAndTime(event.target.value)
              setdateAndTimeError(false)
            }}
            type='text'
            value={dateAndTime}
          />
        </div>
        <div className='inputRow'>
          <label>Expiration</label>
          <span
            className={`${styles.expirationLink}${expirationError ? ` ${styles.expirationLinkError}` : ''}`}
            onClick={() => setChoosingExpiration(true)}
          >
            {format.date({
              date: expiration.getDate(),
              month: expiration.getMonth(),
              year: expiration.getFullYear()
            })}
          </span>
        </div>
      </Modal>
    )
  }
}
