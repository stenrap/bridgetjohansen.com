import React, { useState } from 'react'

import Modal from '../modal/Modal'

import { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } from '../../../shared/Constants'
import styles from './StudentModal.module.scss'

export default props => {
  const {
    student = {}
  } = props
  // const [emails, setEmails] = useState(student.emails || [])
  const [lessonDay, setLessonDay] = useState(student.lessonDay || TUESDAY)
  // const [lessonDuration, setLessonDuration] = useState(student.lessonDuration || '')
  // const [lessonHour, setLessonHour] = useState(student.lessonHour || '')
  // const [lessonMinutes, setLessonMinutes] = useState(student.lessonMinutes || '')
  const [name, setName] = useState(student.name || '')
  const [parents, setParents] = useState(student.parents || '')
  const [phone, setPhone] = useState(student.phone || '')

  return (
    <Modal
      {...props}
      title={`${student.id ? 'Edit' : 'Add'} Student`}
    >
      <div className={styles.inputRow}>
        <label>Name</label>
        <input
          onChange={event => setName(event.target.value)}
          type='text'
          value={name}
        />
      </div>
      <div className={styles.inputRow}>
        <label>Parents</label>
        <input
          onChange={event => setParents(event.target.value)}
          type='text'
          value={parents}
        />
      </div>
      <div className={styles.inputRow}>
        <label>Phone</label>
        <input
          onChange={event => setPhone(event.target.value)}
          type='tel'
          value={phone}
        />
      </div>
      <div className={styles.inputRow}>
        <label>Lesson</label>
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
    </Modal>
  )
}
