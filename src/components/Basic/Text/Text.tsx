import React, { CSSProperties } from 'react'
import { TextContainer } from './styles'

interface TextProps {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
}

export const Text: React.FC<TextProps> = ({ children, style, className }) => {
  return (
    <TextContainer style={style} className={className}>
      {children}
    </TextContainer>
  )
}
