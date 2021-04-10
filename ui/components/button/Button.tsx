import { PropsWithChildren } from 'react'

import ButtonProps from './ButtonProps'
import styles from './Button.module.scss'

const Button = (props: PropsWithChildren<ButtonProps>): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${styles[props.kind]}${props.className ? ` ${props.className}` : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
