import { NextRouter, useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

import * as requests from '../../requests'
import MenuButton from './MenuButton'
import Modal from '../../modals/Modal'
import NavProps from './NavProps'
import styles from './Nav.module.scss'

const Nav = (props: NavProps): JSX.Element => {
  const router: NextRouter = useRouter()

  const [open, setOpen] = useState(false)
  const [requestError, setRequestError] = useState('')

  const navClasses = `${styles.nav}${open ? ` ${styles.open}` : ''}`
  const navListClasses = `${styles.navList}${open ? ` ${styles.open}` : ''}`

  const onMenuButtonClick = (): void => {
    setOpen(!open)
  }

  const onLinkClick = (): void => {
    if (open) setOpen(false)
  }

  const onSignOutClick = async (): Promise<void> => {
    if (open) setOpen(false)
    router.push('/sign-in')
    await requests.signOut()
  }

  const onRequestErrorOk = (): void => {
    setRequestError('')
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
          {props.signedIn
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
      {requestError
        ? <Modal onOk={onRequestErrorOk} title='Error'>{requestError}</Modal>
        : null
      }
    </div>
  )
}

export default Nav
