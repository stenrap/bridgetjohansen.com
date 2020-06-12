import React from 'react'
import { useSelector } from 'react-redux'

import { isAdmin } from '../../../store/userSlice'
import format from '../../../../shared/libs/format'
import styles from './Date.module.scss'

export default ({ groupClassDate }) => {
  const admin = useSelector(isAdmin)

  const formattedDate = format.date(groupClassDate)

  const date = (
    admin
      ? (
        <>
          <span
            className={styles.groupClassDateLink}
            onClick={() => console.log('Opening the Edit Group Class modal...')}
          >
            {formattedDate}
          </span>
        </>
      )
      : formattedDate
  )

  return (
    <div className={styles.groupClassDate}>
      {date}
    </div>
  )
}
