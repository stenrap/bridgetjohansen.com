import MenuButtonProps from './MenuButtonProps'
import styles from './MenuButton.module.scss'

const MenuButton = (props: MenuButtonProps): JSX.Element => {
  const menuButtonClasses = `${styles.menuButton}${props.open ? ` ${styles.open}` : ''}`

  return (
    <button
      className={menuButtonClasses}
      onClick={props.onClick}
    >
      <span />
      <span />
      <span />
    </button>
  )
}

export default MenuButton
