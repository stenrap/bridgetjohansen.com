import React from 'react'
import { useDispatch } from 'react-redux'

import { toggleParent } from '../../store/scheduleSlice'
import styles from './ParentSelector.module.scss'

export default props => {
  const dispatch = useDispatch()

  const idAttribute = `parentSelector${props.id}`

  return (
    <div>
      <input
        id={idAttribute}
        type='checkbox'
      />
      <label
        className={styles.parentSelectorLabel}
        htmlFor={idAttribute}
        onClick={event => {
          dispatch(toggleParent({
            checked: event.target.checked,
            id: props.id
          }))
        }}
      >
        {props.name}
      </label>
    </div>
  )
}
