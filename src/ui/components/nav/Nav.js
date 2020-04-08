import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Nav.module.scss'

export default () => {
  const [open, setOpen] = useState(false)

  const menuButtonClasses = `${styles.menu}${open ? ` ${styles.open}` : ''}`
  const navClasses = `${styles.nav}${open ? ` ${styles.open}` : ''}`

  return (
    <>
      <div
        className={menuButtonClasses}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>
      <ul className={navClasses}>
        <li>
          <NavLink
            activeClassName={styles.navSelected}
            onClick={() => {
              setOpen(false)
            }}
            to='/about'
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.navSelected}
            onClick={() => {
              setOpen(false)
            }}
            to='/policies'
          >
            Policies
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.navSelected}
            onClick={() => {
              setOpen(false)
            }}
            to='/schedule'
          >
            Schedule
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.navSelected}
            onClick={() => {
              setOpen(false)
            }}
            to='/events'
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.navSelected}
            onClick={() => {
              setOpen(false)
            }}
            to='/photos'
          >
            Photos
          </NavLink>
        </li>
      </ul>
    </>
  )
}
