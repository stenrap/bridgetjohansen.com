import styles from './Tooltip.module.scss'
import TooltipProps from './TooltipProps'

const Tooltip = (props: TooltipProps): JSX.Element => {
  // Why are you defaulting to bottom right, then checking `props.arrow` for `bottomRight`?!
  // Because at first you only needed the bottom right, but the stage is set for adding more.
  let arrowClass = styles.tooltipArrowBottomRight

  if (props.arrow === 'bottomRight') {
    arrowClass = styles.tooltipArrowBottomRight
  }

  return (
    <div className={`${styles.tooltip}${props.className ? ` ${props.className}` : ''}`}>
      <span className={styles.tooltipText}>{props.text}</span>
      <div className={`${styles.tooltipArrow} ${arrowClass}`} />
    </div>
  )
}

export default Tooltip
