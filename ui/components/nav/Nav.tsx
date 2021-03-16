import Link from 'next/link'
import { useState } from 'react'

import styles from './Nav.module.scss'

const Nav = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const menuButtonClasses = `${styles.menu}${open ? ` ${styles.open}` : ''}`
  const navClasses = `${styles.nav}${open ? ` ${styles.open}` : ''}`

  return (
    <>
      <div
        className={menuButtonClasses}
        onClick={(): void => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>
      <ul className={navClasses}>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Nav
