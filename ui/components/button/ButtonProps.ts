import { MouseEvent } from 'react'

export default interface ButtonProps {
  className?: string
  disabled?: boolean
  kind: 'primary' | 'secondary'
  onClick: (event: MouseEvent) => void
}
