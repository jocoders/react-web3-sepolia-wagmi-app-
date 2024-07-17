import styled from 'styled-components'
import { Text } from '../Basic'
import backgroundImage from '../../../public/backgroundImage.png'

export const Body = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`

export const RowBalance = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Container = styled.div`
  padding: 30px;
`

export const TextBalance = styled.text`
  margin-left: 10px;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  color: white;
`
