import InputProps from './InputProps'
import styles from './Input.module.scss'

const Input = (props: InputProps): JSX.Element => {
  return (
    <div className={styles.inputBox}>
      <input className={styles.input} placeholder=' ' type={props.type} />
      <div className={styles.placeholder}>{props.placeholder}</div>
    </div>
  )
}

export default Input
