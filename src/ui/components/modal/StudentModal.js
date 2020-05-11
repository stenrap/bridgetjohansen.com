import React, { useState } from 'react'

import Modal from '../modal/Modal'

import { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } from '../../../shared/Constants'
import styles from './StudentModal.module.scss'

export default props => {
  const {
    student = {}
  } = props
  // const [emails, setEmails] = useState(student.emails || [])
  const [lessonAmPm, setLessonAmPm] = useState(student.lessonAmPm || 'pm')
  const [lessonDay, setLessonDay] = useState(student.lessonDay || TUESDAY)
  // const [lessonDuration, setLessonDuration] = useState(student.lessonDuration || '')
  const [lessonHour, setLessonHour] = useState(student.lessonHour || 2)
  const [lessonMinutes, setLessonMinutes] = useState(student.lessonMinutes || 0)
  const [name, setName] = useState(student.name || '')
  const [parents, setParents] = useState(student.parents || '')
  const [phone, setPhone] = useState(student.phone || '')

  return (
    <Modal
      {...props}
      className={styles.studentModal}
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
        <div className={styles.lessonSelects}>
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
    </Modal>
  )
}
