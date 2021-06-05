import { useState } from 'react'
import Link from 'next/link'

import styles from './Nav.module.scss'

const Nav = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const menuButtonClasses = `${styles.menu}${open ? ` ${styles.open}` : ''}`
  const navClasses = `${styles.nav}${open ? ` ${styles.open}` : ''}`
  const navListClasses = `${styles.navList}${open ? ` ${styles.open}` : ''}`

  const onButtonClick = (): void => {
    setOpen(!open)
  }

  const onLinkClick = (): void => {
    if (open) setOpen(false)
  }

  /*
    TODO:
      1. Distinguish the link of the current page from the other links.
      2. Move the menu button and styles into their own files (and make it a <button> instead of a <div>).
   */

  return (
    <div className={navClasses}>
      <div
        className={menuButtonClasses}
        onClick={onButtonClick}
      >
        <span />
        <span />
        <span />
      </div>
      <ul className={navListClasses}>
        <li>
          <Link href='/about'>
            <a onClick={onLinkClick}>About</a>
          </Link>
          <Link href='/sign-in'>
            <a onClick={onLinkClick}>Sign In</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav
