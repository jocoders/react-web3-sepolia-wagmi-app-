import styled from 'styled-components'
import { COLORS } from '../../../theme/colors'

export const InputComponent = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  background-color: ${COLORS.white};
  color: ${COLORS.black};

  &:focus {
    border-color: #007bff;
  }
`
