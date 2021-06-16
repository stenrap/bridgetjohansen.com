import { useState } from 'react'
import Link from 'next/link'

import { isSignedIn } from '../../../store/userSlice'
import { useAppSelector } from '../../../store/hooks'
import MenuButton from './MenuButton'
import styles from './Nav.module.scss'

const Nav = (): JSX.Element => {
  const signedIn: boolean = useAppSelector(isSignedIn)

  const [open, setOpen] = useState(false)

  const navClasses = `${styles.nav}${open ? ` ${styles.open}` : ''}`
  const navListClasses = `${styles.navList}${open ? ` ${styles.open}` : ''}`

  const onMenuButtonClick = (): void => {
    setOpen(!open)
  }

  const onLinkClick = (): void => {
    if (open) setOpen(false)
  }

  const onSignOutClick = (): void => {
    if (open) setOpen(false)
    console.log('Signing out...')
  }

  // TODO: Distinguish the link of the current page from the other links.

  return (
    <div className={navClasses}>
      <MenuButton onClick={onMenuButtonClick} open={open} />
      <ul className={navListClasses}>
        <li>
          <Link href='/about'>
            <a onClick={onLinkClick}>About</a>
          </Link>
          {signedIn
            ? (
              <span
                className={styles.signOut}
                onClick={onSignOutClick}
              >
                Sign Out
              </span>
            )
            : (
              <Link href='/sign-in'>
                <a onClick={onLinkClick}>Sign In</a>
              </Link>
            )
          }
        </li>
      </ul>
    </div>
  )
}

export default Nav
