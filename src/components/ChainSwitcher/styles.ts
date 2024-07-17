import styled from 'styled-components'
import { COLORS } from '../../theme/colors'

const WIDTH = 150

export const ChainSwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
  padding-top: 10px;
`

export const ButtonCurrentChain = styled.button`
  background-color: #f0f0f0;
  color: #333;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  min-width: ${WIDTH}px;
`

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: ${WIDTH}px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 20px;

  ${ChainSwitcherContainer}:hover & {
    display: block;
  }
`

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  min-width: ${WIDTH}px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f9f9f9;
  }
`

export const Text = styled.text`
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.black};
`

export const ColLetter = styled.div`
  background-color: ${COLORS.primary};
  border-radius: 20px;
  width: 20px;
  height: 20px;
`

export const RowCurrentChain = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  gap: 6px;
`
