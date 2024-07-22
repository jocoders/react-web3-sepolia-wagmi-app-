import React, { CSSProperties } from 'react'
import { InputComponent } from './styles'

export type TInputProps = {
  value: string
  style?: CSSProperties
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<TInputProps> = ({ value, onChange, style }) => {
  return <InputComponent type="text" style={style} value={value} onChange={onChange} />
}
