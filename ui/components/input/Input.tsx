import Image from 'next/image'

import InputProps from './InputProps'
import styles from './Input.module.scss'
import ToolTip from '../tooltip/Tooltip'

const Input = (props: InputProps): JSX.Element => {
  return (
    <div className={styles.inputBox}>
      <input className={styles.input} onBlur={props.onBlur} onChange={props.onChange} placeholder=' ' type={props.type} value={props.value} />
      <div className={styles.placeholder}>{props.placeholder}</div>
      {props.error && (
        <>
          <div className={styles.inputErrorIcon}>
            <Image alt='error' src={`${process.env.NEXT_PUBLIC_IMAGES}/error.svg`} height={24} width={24} />
          </div>
          <ToolTip arrow='bottomRight' className={styles.inputTooltip} text={props.error} />
        </>
      )}
    </div>
  )
}

export default Input
