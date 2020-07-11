import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSchedule, getGroupClasses, getGroupClassTimes, getStudents, isFetched } from '../../store/scheduleSlice'
import { getDay } from '../../../shared/libs/student'
import { isAdmin, isSignedIn } from '../../store/userSlice'
import AddGroupClassLink from '../../components/add-group-class-link/AddGroupClassLink'
import AddGroupClassTimeLink from '../../components/add-group-class-time-link/AddGroupClassTimeLink'
import AddParentLink from '../../components/add-parent-link/AddParentLink'
import AddStudentLink from '../../components/add-student-link/AddStudentLink'
import EffectiveDate from '../../components/effective-date/EffectiveDate'
import GroupClass from '../../components/group-class/GroupClass'
import GroupClassTime from '../../components/group-class-time/GroupClassTime'
import LessonDay from '../../components/lesson-day/LessonDay'
import Loader from '../../components/loading/Loader'
import SignOutLink from '../../components/sign-out-link/SignOutLink'
import styles from './Schedule.module.scss'

export default () => {
  const admin = useSelector(isAdmin)
  const dispatch = useDispatch()
  const fetched = useSelector(isFetched)
  const groupClasses = useSelector(getGroupClasses)
  const groupClassTimes = useSelector(getGroupClassTimes)
  const signedIn = useSelector(isSignedIn)
  const students = useSelector(getStudents)

  useEffect(() => {
    if (!signedIn) return
    if (!fetched) dispatch(fetchSchedule())
  }, [signedIn, fetched, dispatch])

  if (!signedIn) return <Redirect to='/sign-in' />

  if (!fetched) return <Loader />

  const addStudentRow = admin && (
    <div className={styles.addStudentRow}>
      <AddParentLink /> <AddStudentLink />
    </div>
  )

  const lessonDays = []

  if (students.length > 0) {
    let day = { name: getDay(students[0].lessonDay), students: [] }
    for (const student of students) {
      if (getDay(student.lessonDay) === day.name) {
        day.students.push(student)
      } else {
        lessonDays.push(<LessonDay {...day} key={day.name} />)
        day = { name: getDay(student.lessonDay), students: [student] }
      }
    }
    // This may look like an unnecessary extra call to lessonDays.push(), but the else block
    // is never executed for the last day (or the first day if there's only one day).
    lessonDays.push(<LessonDay {...day} key={day.name} />)
  }

  const addGroupClassRow = admin && (
    <div className={styles.addGroupClassRow}>
      <AddGroupClassLink /> <AddGroupClassTimeLink />
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
      <div className={styles.lessonDays}>
        {lessonDays}
      </div>
      <div className={styles.scheduleHeader}>
        <div className={styles.groupClasses}>
          <div className={styles.scheduleTitle}>Group Classes</div>
        </div>
      </div>
      {addGroupClassRow}
      {groupClassesRow}
      <div className={styles.groupClassTimes}>
        {groupClassTimes.map(groupClassTime => {
          return (
            <GroupClassTime
              key={groupClassTime.id}
              {...groupClassTime}
            />
          )
        })}
      </div>
    </div>
  )
}
