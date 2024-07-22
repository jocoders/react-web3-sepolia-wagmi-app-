import React, { CSSProperties } from 'react'
import { BaseButton } from './styles'

export type ButtonType = 'primary' | 'secondary'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType
  style?: CSSProperties
}

export const Button: React.FC<ButtonProps> = ({ buttonType, style, ...props }) => {
  return <BaseButton buttonType={buttonType} style={style} {...props} />
}
