import React, { CSSProperties } from 'react'
import { ColContainer } from './styles'

interface ColProps {
  children: React.ReactNode
  style?: CSSProperties
}

export const Col: React.FC<ColProps> = ({ children, style }) => {
  return <ColContainer style={style}>{children}</ColContainer>
}
