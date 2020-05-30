import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSelectedParents, toggleParent } from '../../store/scheduleSlice'
import styles from './ParentSelector.module.scss'

export default props => {
  const dispatch = useDispatch()

  const selectedParents = useSelector(getSelectedParents)
  const checked = selectedParents.includes(props.id)
  const idAttribute = `parentSelector${props.id}`

  return (
    <div>
      <input
        checked={checked}
        id={idAttribute}
        onChange={event => {
          dispatch(toggleParent({
            checked: event.target.checked,
            id: props.id
          }))
        }}
        type='checkbox'
      />
      <label
        className={styles.parentSelectorLabel}
        htmlFor={idAttribute}
      >
        {props.name}
      </label>
    </div>
  )
}
