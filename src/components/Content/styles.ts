import styled from 'styled-components'
import { Button as ButtonComponent, ButtonProps } from '../Basic'
import { BUTTON_WIDTH } from '../../consts/layout'
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`

export const Button = styled(ButtonComponent)<ButtonProps>`
  width: ${BUTTON_WIDTH};
  margin-right: 10px;
`

export const RowBalance = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const RowButtonInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const TextBalance = styled.text`
  margin-left: 10px;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  color: white;
`

export const TextError = styled.text`
  color: red;
  font-weight: bold;
  margin-left: 10px;
`
