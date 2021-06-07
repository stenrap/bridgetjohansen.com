import { MouseEvent } from 'react'

export default interface ModalProps {
  cancelLabel?: string
  className?: string
  okLabel?: string
  onCancel?: (event: MouseEvent) => void
  onOk?: (event: MouseEvent) => void
  title: string
}
