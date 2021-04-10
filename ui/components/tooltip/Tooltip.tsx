import styles from './Tooltip.module.scss'
import TooltipProps from './TooltipProps'

const Tooltip = (props: TooltipProps): JSX.Element => {
  let arrowDirectionClass = styles.tooltipArrowDown

  if (props.arrow === 'left') {
    arrowDirectionClass = styles.tooltipArrowLeft
  } else if (props.arrow === 'up') {
    arrowDirectionClass = styles.tooltipArrowUp
  }

  return (
    <div className={`${styles.tooltip}${props.className ? ` ${props.className}` : ''}`}>
      <span className={styles.tooltipText}>{props.text}</span>
      <div className={`${styles.tooltipArrow} ${arrowDirectionClass}${props.arrowClassName ? ` ${props.arrowClassName}` : ''}`} />
    </div>
  )
}

export default Tooltip
