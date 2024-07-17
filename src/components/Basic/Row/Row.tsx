import React, { CSSProperties } from 'react'
import { RowContainer } from './styles'

interface RowProps {
  children: React.ReactNode
  style?: CSSProperties
}

export const Row: React.FC<RowProps> = ({ children, style }) => {
  return <RowContainer style={style}>{children}</RowContainer>
}
