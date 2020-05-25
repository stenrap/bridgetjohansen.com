import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAddingParent, setAddingParent } from '../../store/scheduleSlice'

import styles from './AddParentLink.module.scss'

export default () => {
  const addingParent = useSelector(isAddingParent)
  const dispatch = useDispatch()

  if (addingParent) {

  }

  return (
    <>
      <span
        className={styles.addParentLink}
        onClick={() => dispatch(setAddingParent(true))}
      >
        Add Parent(s)
      </span>
    </>
  )
}
