import styled, { css } from 'styled-components'
import { ButtonType } from './Button'
import { COLORS } from '../../../theme/colors'

interface ButtonProps {
  buttonType?: ButtonType
}

export const BaseButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${(props) =>
    props.buttonType === 'primary' &&
    css`
      background-color: ${COLORS.primary};

      &:hover {
        background-color: ${COLORS.bg_primary};
      }
    `}

  ${(props) =>
    props.buttonType === 'secondary' &&
    css`
      background-color: ${COLORS.secondary};

      &:hover {
        background-color: ${COLORS.bg_secondary};
      }
    `}
`
