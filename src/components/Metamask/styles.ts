import styled from 'styled-components'
import { Button as ButtonBase, Input as InputBase } from '../Basic'

export const ButtonDisconnect = styled(ButtonBase)`
  width: 180px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const RowBalance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const RowButtonInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
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
