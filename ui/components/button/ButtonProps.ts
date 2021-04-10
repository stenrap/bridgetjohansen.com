import { MouseEvent } from 'react'

export default interface ButtonProps {
  className?: string
  kind: 'primary' | 'secondary'
  onClick: (event: MouseEvent) => void
}
