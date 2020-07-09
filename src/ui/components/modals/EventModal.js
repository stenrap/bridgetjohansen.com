import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { isMutatingEvent } from '../../store/eventsSlice'
import DatePicker from './DatePicker'
import format from '../../../shared/libs/format'
import LoadingModal from '../loading/LoadingModal'
import Modal from './Modal'
import styles from './EventModal.module.scss'

export default props => {
  const mutatingEvent = useSelector(isMutatingEvent)

  const {
    event = {}
  } = props

  // Events must expire in the future, so we default to expiring them tomorrow.
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [choosingExpiration, setChoosingExpiration] = useState(false)
  const [dateAndTime, setDateAndTime] = useState(props.dateAndTime || '')
  const [dateAndTimeError, setdateAndTimeError] = useState(false)
  const [expiration, setExpiration] = useState(props.expiration || tomorrow)
  const [location, setLocation] = useState(props.location || '')
  const [locationError, setLocationError] = useState(props.location || '')
  const [name, setName] = useState(props.name || '')
  const [nameError, setNameError] = useState(false)

  if (mutatingEvent) {
    return <LoadingModal title={`${event.id ? 'Editing' : 'Adding'} event...`} />
  } else {
    if (choosingExpiration) {
      return (
        <DatePicker
          date={expiration.getDate()}
          month={expiration.getMonth()}
          onCancel={() => setChoosingExpiration(false)}
          onOk={date => {
            setExpiration(date)
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
          console.log('Dispatch something to add/edit the event...')
        }}
        title={`${event.id ? 'Edit' : 'Add'} Event`}
        {...props}
      >
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
          <label>Expiration</label>
          <span
            className={styles.expirationLink}
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
