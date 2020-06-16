import React, { useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

import {
  isMutatingGroupClassTime,
  setConfirmingDeleteGroupClassTimeId,
  setEditingGroupClassTimeId
} from '../../store/scheduleSlice'
import Button from '../button/Button'
import LoadingModal from '../loading/LoadingModal'
import Modal from './Modal'
import styles from './GroupClassTimeModal.module.scss'

export default props => {
  const dispatch = useDispatch()
  const mutatingGroupClassTime = useSelector(isMutatingGroupClassTime)

  const {
    groupClassTime = {}
  } = props

  const [duration, setDuration] = useState(groupClassTime.duration || 30)
  const [hour, setHour] = useState(groupClassTime.hour || 3)
  const [meridiem, setMeridiem] = useState(groupClassTime.meridiem || 'pm')
  const [minutes, setMinutes] = useState(groupClassTime.minutes || 0)

  if (mutatingGroupClassTime) {
    return <LoadingModal title={`${mutatingGroupClassTime ? 'Editing' : 'Adding'} group class time...`} />
  } else {
    return (
      <Modal
        className={styles.groupClassTimeModal}
        title={`${groupClassTime.id ? 'Edit' : 'Add'} Group Class Time`}
      >
        {groupClassTime.id && (
          <Button
            className={styles.deleteButton}
            onClick={() => {
              batch(() => {
                dispatch(setEditingGroupClassTimeId(0))
                dispatch(setConfirmingDeleteGroupClassTimeId(groupClassTime.id))
              })
            }}
          >
            Delete
          </Button>
        )}
        <div className='inputRow'>
          <select
            className={styles.hour}
            onChange={event => setHour(Number(event.target.value))}
            value={hour}
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
            className={styles.minutes}
            onChange={event => setMinutes(Number(event.target.value))}
            value={minutes}
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
            className={styles.minutes}
            onChange={event => setMeridiem(event.target.value)}
            value={meridiem}
          >
            <option value='am'>AM</option>
            <option value='pm'>PM</option>
          </select>
          <select
            className={styles.duration}
            onChange={event => setDuration(Number(event.target.value))}
            value={duration}
          >
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>60 min</option>
          </select>
        </div>
      </Modal>
    )
  }
}
