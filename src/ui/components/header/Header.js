import React from 'react'
import { Link } from 'react-router-dom'

import Nav from '../nav/Nav'
import styles from './Header.module.scss'

export default () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Link to='/'>
          <span className={styles.titleNameText}>Bridget Johansen</span>
          <span className={styles.titleText}>Piano Studio</span>
        </Link>
      </div>
      <Nav />
    </div>
  )
}
