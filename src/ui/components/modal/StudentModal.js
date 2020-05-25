import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isValidEmailList, isValidString } from '../../../shared/libs/validation'
import { isMutatingStudent, mutateStudent } from '../../store/scheduleSlice'
import { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } from '../../../shared/Constants'
import LoadingModal from '../loading/LoadingModal'
import Modal from '../modal/Modal'
import styles from './StudentModal.module.scss'

export default props => {
  const dispatch = useDispatch()
  const mutatingStudent = useSelector(isMutatingStudent)

  const {
    student = {}
  } = props

  const [emails, setEmails] = useState(student.emails || '')
  const [emailsError, setEmailsError] = useState(false)
  const [emailSyntaxError, setEmailSyntaxError] = useState(false)
  const [lessonDay, setLessonDay] = useState(student.lessonDay || TUESDAY)
  const [lessonDuration, setLessonDuration] = useState(student.lessonDuration || 30)
  const [lessonHour, setLessonHour] = useState(student.lessonHour || 2)
  const [lessonMeridiem, setLessonMeridiem] = useState(student.lessonMeridiem || 'pm')
  const [lessonMinutes, setLessonMinutes] = useState(student.lessonMinutes || 0)
  const [name, setName] = useState(student.name || '')
  const [nameError, setNameError] = useState(false)
  const [parents, setParents] = useState(student.parents || '')
  const [parentsError, setParentsError] = useState(false)
  const [phone, setPhone] = useState(student.phone || '')
  const [phoneError, setPhoneError] = useState(false)

  if (mutatingStudent) {
    return <LoadingModal title={`${student.id ? 'Editing' : 'Adding'} student...`} />
  } else {
    return (
      <Modal
        className={styles.studentModal}
        onOk={() => {
          if (!isValidString(name)) setNameError(true)
          if (!isValidString(parents)) setParentsError(true)
          if (!isValidString(phone)) setPhoneError(true)

          const allEmails = emails.split('\n').filter(email => isValidString(email))
          if (allEmails.length === 0) return setEmailsError(true)
          if (!isValidEmailList(allEmails)) return setEmailSyntaxError(true)

          dispatch(mutateStudent({
            emails: allEmails,
            lessonDay,
            lessonDuration,
            lessonHour,
            lessonMeridiem,
            lessonMinutes,
            name,
            parents,
            phone
          }))
        }}
        title={`${student.id ? 'Edit' : 'Add'} Student`}
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
          <label>Lesson</label>
          <select
            className={styles.lessonDay}
            onChange={event => setLessonDay(Number(event.target.value))}
            value={lessonDay}
          >
            <option value={SUNDAY}>Sun</option>
            <option value={MONDAY}>Mon</option>
            <option value={TUESDAY}>Tue</option>
            <option value={WEDNESDAY}>Wed</option>
            <option value={THURSDAY}>Thu</option>
            <option value={FRIDAY}>Fri</option>
            <option value={SATURDAY}>Sat</option>
          </select>
          <select
            className={styles.lessonHour}
            onChange={event => setLessonHour(Number(event.target.value))}
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
            onChange={event => setLessonMinutes(Number(event.target.value))}
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
            onChange={event => setLessonMeridiem(event.target.value)}
            value={lessonMeridiem}
          >
            <option value='am'>AM</option>
            <option value='pm'>PM</option>
          </select>
          <select
            className={styles.lessonDuration}
            onChange={event => setLessonDuration(Number(event.target.value))}
            value={lessonDuration}
          >
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>60 min</option>
          </select>
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
