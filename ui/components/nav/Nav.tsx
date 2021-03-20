import Link from 'next/link'
import { useState } from 'react'

import styles from './Nav.module.scss'

const Nav = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const menuButtonClasses = `${styles.menu}${open ? ` ${styles.open}` : ''}`
  const navListClasses = `${styles.navList}${open ? ` ${styles.open}` : ''}`

  return (
    <div className={styles.nav}>
      <div
        className={menuButtonClasses}
        onClick={(): void => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>
      <ul className={navListClasses}>
        <li>
          <Link href='/about'>
            <a>About</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav
