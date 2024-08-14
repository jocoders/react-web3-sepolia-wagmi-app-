import styled from 'styled-components'

export const PanelContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #1c1c1c;
  border-radius: 10px;
  padding: 10px;
  color: white;
`

export const TokenName = styled.div`
  margin-right: 10px;
  font-size: 16px;
`

export const TokenAmount = styled.div`
  margin-right: 10px;
  font-size: 16px;
`

export const CopyButton = styled.button`
  background-color: #3c3c3c;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: 18px;
  height: 30px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
