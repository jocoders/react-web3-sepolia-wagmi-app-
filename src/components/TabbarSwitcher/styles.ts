import styled from 'styled-components'
import { COLORS } from '../../theme/colors'

export const TabBarContainer = styled.div`
  display: flex;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

interface TabProps {
  isActive: boolean
}

const customShouldForwardProp = (prop: string) => prop !== 'isActive'

export const Tab = styled('div').withConfig({
  shouldForwardProp: customShouldForwardProp
})<TabProps>`
  padding: 6px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  color: ${(props) => (props.isActive ? COLORS.white : '#000')};
  background-color: ${(props) => (props.isActive ? COLORS.primary : '#E0E0E0')};
  transition: background-color 0.3s, color 0.3s;

  &:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  &:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  &:hover {
    background-color: ${(props) => (props.isActive ? COLORS.primary : '#d5d5d5')};
  }

  width: 200px;
`
