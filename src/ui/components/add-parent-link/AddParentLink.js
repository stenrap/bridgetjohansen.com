import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAddingParent, setAddingParent } from '../../store/scheduleSlice'
import ParentModal from '../modals/ParentModal'
import styles from './AddParentLink.module.scss'

export default () => {
  const addingParent = useSelector(isAddingParent)
  const dispatch = useDispatch()

  const modal = addingParent && (
    <ParentModal
      onCancel={() => dispatch(setAddingParent(false))}
    />
  )

  return (
    <>
      <span
        className={styles.addParentLink}
        onClick={() => dispatch(setAddingParent(true))}
      >
        Add Parent
      </span>
      {modal}
    </>
  )
}
