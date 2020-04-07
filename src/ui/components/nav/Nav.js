import React, { useState } from 'react'

import styles from './Nav.module.scss'

export default () => {
  const [open, setOpen] = useState(false)

  const menuClasses = `${styles.menu}${open ? ` ${styles.open}` : ''}`

  return (
    <ul className={styles.nav}>
      <div
        className={menuClasses}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>
      <li>About</li>
      <li>Policies</li>
    </ul>
  )
}
