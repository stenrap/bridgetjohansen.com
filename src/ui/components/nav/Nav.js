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
          <NavLink to='/about' activeClassName={styles.navSelected}>About</NavLink>
        </li>
        <li>
          <NavLink to='/policies' activeClassName={styles.navSelected}>Policies</NavLink>
        </li>
      </ul>
    </>
  )
}
