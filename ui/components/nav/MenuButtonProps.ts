import { MouseEvent } from 'react'

export default interface MenuButtonProps {
  onClick: (event: MouseEvent) => void
  open: boolean
}
