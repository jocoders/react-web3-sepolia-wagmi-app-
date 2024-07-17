import React, { CSSProperties } from 'react'
import { ImageContainer, ImageElement } from './styles'

interface ImageProps {
  source: string
  alt?: string
  containerStyle?: CSSProperties
  imageStyle?: CSSProperties
}

export const Image: React.FC<ImageProps> = ({ source, alt, containerStyle, imageStyle }) => {
  return (
    <ImageContainer style={containerStyle}>
      <ImageElement src={source} alt={alt} style={imageStyle} />
    </ImageContainer>
  )
}
