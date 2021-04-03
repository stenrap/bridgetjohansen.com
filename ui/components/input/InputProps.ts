import { ChangeEvent, FocusEvent } from 'react'

export default interface InputProps {
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type: string
  value: string | ReadonlyArray<string> | number
}
