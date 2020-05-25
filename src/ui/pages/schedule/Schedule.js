import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AddStudentLink from '../../components/add-student-link/AddStudentLink'
import Day from '../../components/day/Day'
import EffectiveDate from '../../components/effective-date/EffectiveDate'
import { fetchSchedule, getStudents } from '../../store/scheduleSlice'
import { getDay } from '../../../shared/libs/student'
import { isAdmin, isSignedIn } from '../../store/userSlice'
import SignOutLink from '../../components/sign-out-link/SignOutLink'
import styles from './Schedule.module.scss'

export default () => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const signedIn = useSelector(isSignedIn)
  const students = useSelector(getStudents)

  useEffect(() => {
    if (!signedIn) return
    dispatch(fetchSchedule())
  }, [dispatch, signedIn])

  if (!signedIn) return <Redirect to='/sign-in' />

  const addStudentRow = admin && (
    <div className={styles.addStudentRow}>
      <AddStudentLink />
    </div>
  )

  const days = []

  if (students.length > 0) {
    let day = { name: getDay(students[0].lessonDay), students: [] }
    for (const student of students) {
      if (getDay(student.lessonDay) === day.name) {
        day.students.push(student)
      } else {
        days.push(<Day {...day} key={day.name} />)
        day = { name: getDay(student.lessonDay), students: [student] }
      }
    }
    // This may look like an unnecessary extra call to days.push(), but the else block
    // is never executed for the last day (or the first day if there's only one day).
    days.push(<Day {...day} key={day.name} />)
  }

  return (
    <div className={styles.schedule}>
      <div className={styles.scheduleHeader}>
        <div>
          <div className={styles.scheduleTitle}>Lesson Schedule</div>
          <EffectiveDate />
        </div>
        <SignOutLink />
      </div>
      {addStudentRow}
      <div className={styles.days}>{days}</div>
    </div>
  )
}
