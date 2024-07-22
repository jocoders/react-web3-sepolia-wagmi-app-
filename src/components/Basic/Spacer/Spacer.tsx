import React from 'react'
import styled from 'styled-components'

interface SpacerProps {
  height: number
}

const SpacerDiv = styled.div<SpacerProps>`
  margin-bottom: ${(props) => props.height}px;
`

export const Spacer: React.FC<SpacerProps> = ({ height }) => {
  return <SpacerDiv height={height} />
}
