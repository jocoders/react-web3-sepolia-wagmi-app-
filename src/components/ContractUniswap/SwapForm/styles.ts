import styled from 'styled-components'

const WIDTH = 400

export const Button = styled.button`
  background-color: #3c3c3c;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: 18px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 50px;
  right: ${WIDTH / 2}px;
`

export const Container = styled.div`
  background-color: #1c1c1c;
  border-radius: 10px;
  padding: 20px;
  width: ${WIDTH}px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`

export const Dropdown = styled.select`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  margin-left: 10px;
  outline: none;
`

export const Header = styled.h2`
  color: white;
  margin: 0;
  font-size: 18px;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #2c2c2c;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
`

export const Input = styled.input`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  flex: 1;
  outline: none;

  &::placeholder {
    color: #888;
  }
`

export const Settings = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  cursor: pointer;
`

export const TextError = styled.text`
  color: red;
  font-size: 14px;
  margin: 0;
  position: absolute;
  top: 24px;
  left: 90px;
`
