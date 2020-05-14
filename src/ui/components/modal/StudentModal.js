import React, { useState } from 'react'

import { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } from '../../../shared/Constants'
import Modal from '../modal/Modal'
import styles from './StudentModal.module.scss'
import validation from '../../../shared/libs/validation'

export default props => {
  const {
    student = {}
  } = props
  const [emails, setEmails] = useState(student.emails || '')
  const [emailsError, setEmailsError] = useState(false)
  const [emailSyntaxError, setEmailSyntaxError] = useState(false)
  const [lessonAmPm, setLessonAmPm] = useState(student.lessonAmPm || 'pm')
  const [lessonDay, setLessonDay] = useState(student.lessonDay || TUESDAY)
  const [lessonDuration, setLessonDuration] = useState(student.lessonDuration || 30)
  const [lessonHour, setLessonHour] = useState(student.lessonHour || 2)
  const [lessonMinutes, setLessonMinutes] = useState(student.lessonMinutes || 0)
  const [name, setName] = useState(student.name || '')
  const [nameError, setNameError] = useState(false)
  const [parents, setParents] = useState(student.parents || '')
  const [parentsError, setParentsError] = useState(false)
  const [phone, setPhone] = useState(student.phone || '')
  const [phoneError, setPhoneError] = useState(false)

  return (
    <Modal
      {...props}
      onOk={() => {
        if (!validation.isValidString(name)) setNameError(true)
        if (!validation.isValidString(parents)) setParentsError(true)
        if (!validation.isValidString(phone)) setPhoneError(true)

        const allEmails = emails.split('\n').filter(email => validation.isValidString(email))

        if (allEmails.length === 0) return setEmailsError(true)

        for (const email of allEmails) {
          if (!validation.isValidEmail(email)) return setEmailSyntaxError(true)
        }
        // TODO .... Dispatch a mutation that either creates or changes the student
      }}
      title={`${student.id ? 'Edit' : 'Add'} Student`}
    >
      <div className={styles.inputRow}>
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
      <div className={styles.inputRow}>
        <label>Parents</label>
        <input
          className={parentsError ? 'error' : undefined}
          onChange={event => {
            setParents(event.target.value)
            setParentsError(false)
          }}
          type='text'
          value={parents}
        />
      </div>
      <div className={styles.inputRow}>
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
      <div className={styles.inputRow}>
        <label>Lesson Day</label>
        <select
          className={styles.lessonDay}
          onChange={event => setLessonDay(event.target.value)}
          value={lessonDay}
        >
          <option value={SUNDAY}>Sunday</option>
          <option value={MONDAY}>Monday</option>
          <option value={TUESDAY}>Tuesday</option>
          <option value={WEDNESDAY}>Wednesday</option>
          <option value={THURSDAY}>Thursday</option>
          <option value={FRIDAY}>Friday</option>
          <option value={SATURDAY}>Saturday</option>
        </select>
      </div>
      <div className={styles.inputRow}>
        <label>Lesson Time</label>
        <div className={styles.lessonSelects}>
          <select
            className={styles.lessonHour}
            onChange={event => setLessonHour(event.target.value)}
            value={lessonHour}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
          </select>
          <select
            className={styles.lessonMinutes}
            onChange={event => setLessonMinutes(event.target.value)}
            value={lessonMinutes}
          >
            <option value={0}>00</option>
            <option value={5}>05</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
            <option value={40}>40</option>
            <option value={45}>45</option>
            <option value={50}>50</option>
            <option value={55}>55</option>
          </select>
          <select
            className={styles.lessonMinutes}
            onChange={event => setLessonAmPm(event.target.value)}
            value={lessonAmPm}
          >
            <option value='am'>AM</option>
            <option value='pm'>PM</option>
          </select>
        </div>
      </div>
      <div className={styles.inputRow}>
        <label>Lesson Duration</label>
        <select
          className={styles.lessonDuration}
          onChange={event => setLessonDuration(event.target.value)}
          value={lessonDuration}
        >
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
        </select>
      </div>
      <div className={styles.inputRow}>
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
