import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getParents, isMutatingStudent, mutateStudent } from '../../store/scheduleSlice'
import { isValidString } from '../../../shared/libs/validation'
import { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } from '../../../shared/Constants'
import LoadingModal from '../loading/LoadingModal'
import Modal from '../modal/Modal'
import styles from './StudentModal.module.scss'

export default props => {
  const dispatch = useDispatch()
  const mutatingStudent = useSelector(isMutatingStudent)
  const parents = useSelector(getParents)

  const {
    student = {}
  } = props

  const [lessonDay, setLessonDay] = useState(student.lessonDay || TUESDAY)
  const [lessonDuration, setLessonDuration] = useState(student.lessonDuration || 30)
  const [lessonHour, setLessonHour] = useState(student.lessonHour || 2)
  const [lessonMeridiem, setLessonMeridiem] = useState(student.lessonMeridiem || 'pm')
  const [lessonMinutes, setLessonMinutes] = useState(student.lessonMinutes || 0)
  const [name, setName] = useState(student.name || '')
  const [nameError, setNameError] = useState(false)
  const [parentIds, setParentIds] = useState([])
  const [parentIdsError, setParentIdsError] = useState(false)

  if (mutatingStudent) {
    return <LoadingModal title={`${student.id ? 'Editing' : 'Adding'} student...`} />
  } else {
    return (
      <Modal
        className={styles.studentModal}
        onOk={() => {
          if (!isValidString(name)) return setNameError(true)
          if (parentIds.length === 0) return setParentIdsError(true)

          dispatch(mutateStudent({
            id: student.id,
            lessonDay,
            lessonDuration,
            lessonHour,
            lessonMeridiem,
            lessonMinutes,
            name,
            parentIds
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
        <div>
          <label>Parent(s)</label>
          <div className={`${styles.parents}${parentIdsError ? ` ${styles.parentsError}` : ''}`}>
            {parents.map(parent => {
              const idAttribute = `parentSelector${parent.id}`
              return (
                <div key={`parent-${parent.id}`}>
                  <input
                    checked={parentIds.includes(parent.id)}
                    id={idAttribute}
                    onChange={event => {
                      if (event.target.checked) {
                        setParentIdsError(false)
                        setParentIds(parentIds.concat(parent.id))
                      } else {
                        const newParentIds = []
                        for (const id of parentIds) {
                          if (id !== parent.id) {
                            newParentIds.push(id)
                          }
                        }
                        setParentIds(newParentIds)
                      }
                    }}
                    type='checkbox'
                  />
                  <label
                    htmlFor={idAttribute}
                  >
                    {parent.name}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    )
  }
}
