import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { isMutatingParent } from '../../store/scheduleSlice'
import LoadingModal from '../loading/LoadingModal'
import Modal from './Modal'
import styles from './ParentModal.module.scss'

export default props => {
  const mutatingParent = useSelector(isMutatingParent)

  const {
    parent = {}
  } = props

  const [emails, setEmails] = useState(parent.emails || '')
  const [emailsError, setEmailsError] = useState(false)
  const [emailSyntaxError, setEmailSyntaxError] = useState(false)
  const [name, setName] = useState(parent.name || '')
  const [nameError, setNameError] = useState(false)
  const [phone, setPhone] = useState(parent.phone || '')
  const [phoneError, setPhoneError] = useState(false)

  if (mutatingParent) {
    return <LoadingModal title={`${parent.id ? 'Editing' : 'Adding'} parent...`} />
  } else {
    return (
      <Modal
        className={styles.parentModal}
        title={`${parent.id ? 'Edit' : 'Add'} Parent(s)`}
        {...props}
      >
        <div className='inputRow'>
          <label>Name(s)</label>
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
          <label>Phone</label>
          <input
            className={phoneError ? 'error' : undefined}
            onChange={event => {
              setPhone(event.target.value)
              setPhoneError(false)
            }}
            type='tel'
            value={phone}
          />
        </div>
        <div className='inputRow'>
          <label>Google Sign-In Emails<span className='errorText'>{emailSyntaxError ? ' (invalid syntax)' : ''}</span></label>
          <textarea
            className={emailsError || emailSyntaxError ? 'error' : undefined}
            onChange={event => {
              setEmails(event.target.value)
              setEmailsError(false)
              setEmailSyntaxError(false)
            }}
            placeholder='One per line...'
            value={emails}
          />
        </div>
      </Modal>
    )
  }
}
