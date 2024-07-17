import React, { CSSProperties } from 'react'
import { Container, ContentContainer, Text } from './styles'

interface HeaderProps {
  text: string
  containerStyle?: CSSProperties
  textStyle?: CSSProperties
}

export const Header: React.FC<HeaderProps> = ({ text, containerStyle, textStyle }) => {
  return (
    <Container style={containerStyle}>
      <ContentContainer>
        <Text style={textStyle}>{text}</Text>
      </ContentContainer>
    </Container>
  )
}
