import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSchedule, getGroupClasses, getStudents } from '../../store/scheduleSlice'
import { getDay } from '../../../shared/libs/student'
import { isAdmin, isSignedIn } from '../../store/userSlice'
import AddDateLink from '../../components/group-classes/add-date-link/AddDateLink'
import AddParentLink from '../../components/add-parent-link/AddParentLink'
import AddStudentLink from '../../components/add-student-link/AddStudentLink'
import AddTimeLink from '../../components/group-classes/add-time-link/AddTimeLink'
import Day from '../../components/day/Day'
import EffectiveDate from '../../components/effective-date/EffectiveDate'
import GroupClass from '../../components/group-classes/date/GroupClass'
import SignOutLink from '../../components/sign-out-link/SignOutLink'
import styles from './Schedule.module.scss'

export default () => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const groupClasses = useSelector(getGroupClasses)
  const signedIn = useSelector(isSignedIn)
  const students = useSelector(getStudents)

  useEffect(() => {
    if (!signedIn) return
    dispatch(fetchSchedule())
  }, [dispatch, signedIn])

  if (!signedIn) return <Redirect to='/sign-in' />

  const addStudentRow = admin && (
    <div className={styles.addStudentRow}>
      <AddParentLink /> <AddStudentLink />
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

  const addGroupClassRow = admin && (
    <div className={styles.addGroupClassRow}>
      <AddDateLink /> <AddTimeLink />
    </div>
  )

  const groupClassesRow = groupClasses.length > 0 && (
    <div className={styles.groupClassesRow}>
      {groupClasses.map(groupClass => {
        return (
          <GroupClass
            groupClass={groupClass}
            key={groupClass.id}
          />
        )
      })}
    </div>
  )

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
      <div className={styles.days}>
        {days}
      </div>
      <div className={styles.scheduleHeader}>
        <div className={styles.groupClasses}>
          <div className={styles.scheduleTitle}>Group Classes</div>
        </div>
      </div>
      {addGroupClassRow}
      {groupClassesRow}
    </div>
  )
}
