import React, { useState, useEffect } from 'react'
import { Container, Header, InputContainer, Input, Button, Dropdown, Settings, TextError } from './styles'
import { ESwapTokens } from '../../../types/swap'
import { TContractUniswapProps } from '../ContractUniswap'
import { parseEther, formatUnits } from 'viem'

const ETH_VALUE = BigInt(100000 * 10 ** 12)

const isEnumValue = (value: any, enumObject: any): value is ESwapTokens => {
  return Object.values(enumObject).includes(value)
}

export const SwapForm: React.FC<TContractUniswapProps> = ({ onSwap, error, clearSwapError }) => {
  const [fromAmount, setFromAmount] = useState('0')
  const [toAmount, setToAmount] = useState('0')

  const [fromToken, setFromToken] = useState(ESwapTokens.ETH)
  const [toToken, setToToken] = useState(ESwapTokens.GAL)

  useEffect(() => {
    if (fromToken === ESwapTokens.ETH) {
      const amount = parseEther(fromAmount || '0')
      const outputValue = (amount * BigInt(ETH_VALUE)) / BigInt(10 ** 18)
      setToAmount(formatUnits(outputValue, 18))
    }
    if (toToken === ESwapTokens.ETH) {
      const amount = parseEther(fromAmount || '0')
      const outputValue = (amount * BigInt(ETH_VALUE)) / BigInt(10 ** 16)
      setToAmount(formatUnits(outputValue, 18))
    }
    if (fromToken !== ESwapTokens.ETH && toToken !== ESwapTokens.ETH) {
      setToAmount(fromAmount)
    }
  }, [fromAmount, fromToken, fromAmount])

  const onChangeFromTokenAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearSwapError()
    setFromAmount(e.target.value)
  }

  const onChangeToTokenAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearSwapError()
    setToAmount(e.target.value)
  }

  const onChangeFromToken = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (isEnumValue(value, ESwapTokens)) {
      setFromToken(value)
    } else {
      console.error(`Invalid value for fromToken: ${value}`)
    }
  }

  const onChangeToToken = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (isEnumValue(value, ESwapTokens)) {
      setToToken(value)
    } else {
      console.error(`Invalid value for toToken: ${value}`)
    }
  }

  const onClickSwap = () => {
    onSwap({ fromToken, toToken, fromAmount: parseEther(fromAmount), toAmount: parseEther(toAmount) })
  }

  return (
    <Container>
      <Header>Swap</Header>
      {!!error && <TextError>{`ERROR: ${error}`}</TextError>}
      <Settings>⚙️</Settings>
      <InputContainer>
        <Input type={'number'} placeholder={'0'} value={fromAmount} onChange={onChangeFromTokenAmount} />
        <Dropdown value={fromToken} onChange={onChangeFromToken}>
          <option value={ESwapTokens.ETH}>{'ETH'}</option>
          <option value={ESwapTokens.GAL}>{'GAL'}</option>
          <option value={ESwapTokens.JOC}>{'JOC'}</option>
          <option value={ESwapTokens.WETH}>{'WETH'}</option>
        </Dropdown>
      </InputContainer>
      <Button onClick={onClickSwap}>↓</Button>
      <InputContainer>
        <Input type={'number'} placeholder={'0'} value={toAmount} onChange={onChangeToTokenAmount} />
        <Dropdown value={toToken} onChange={onChangeToToken}>
          <option value={ESwapTokens.ETH}>{'ETH'}</option>
          <option value={ESwapTokens.GAL}>{'GAL'}</option>
          <option value={ESwapTokens.JOC}>{'JOC'}</option>
          <option value={ESwapTokens.WETH}>{'WETH'}</option>
        </Dropdown>
      </InputContainer>
    </Container>
  )
}
