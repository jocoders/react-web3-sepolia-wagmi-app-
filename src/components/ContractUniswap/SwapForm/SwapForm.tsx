import React, { useState, useEffect } from 'react'
import {
  SwapContainer,
  SwapHeader,
  SwapInputContainer,
  SwapInput,
  SwapButton,
  SwapDropdown,
  SwapSettings
} from './styles'
import { ESwapTokens } from '../../../types/swap'
import { TContractUniswapProps } from '../ContractUniswap'
import { parseEther, formatUnits } from 'viem'

const ETH_VALUE = BigInt(100000 * 10 ** 12)

const isEnumValue = (value: any, enumObject: any): value is ESwapTokens => {
  return Object.values(enumObject).includes(value)
}

export const SwapForm: React.FC<TContractUniswapProps> = ({ onSwap }) => {
  const [fromTokenAmount, setFromTokenAmount] = useState('0')
  const [toTokenAmount, setToTokenAmount] = useState('0')

  const [fromToken, setFromToken] = useState(ESwapTokens.ETH)
  const [toToken, setToToken] = useState(ESwapTokens.GAL)

  useEffect(() => {
    if (fromToken === ESwapTokens.ETH) {
      const fromAmount = parseEther(fromTokenAmount || '0')
      const outputValue = (fromAmount * BigInt(ETH_VALUE)) / BigInt(10 ** 18)
      setToTokenAmount(formatUnits(outputValue, 18))
    }
  }, [fromTokenAmount, fromToken])

  const onChangeFromTokenAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromTokenAmount(e.target.value)
  }

  const onChangeToTokenAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToTokenAmount(e.target.value)
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
    onSwap({ fromToken, toToken, fromTokenAmount, toTokenAmount })
  }

  return (
    <SwapContainer>
      <SwapHeader>Swap</SwapHeader>
      <SwapSettings>⚙️</SwapSettings>
      <SwapInputContainer>
        <SwapInput type={'number'} placeholder={'0'} value={fromTokenAmount} onChange={onChangeFromTokenAmount} />
        <SwapDropdown value={fromToken} onChange={onChangeFromToken}>
          <option value={ESwapTokens.ETH}>{'ETH'}</option>
          <option value={ESwapTokens.GAL}>{'GAL'}</option>
          <option value={ESwapTokens.JOC}>{'JOC'}</option>
          <option value={ESwapTokens.WETH}>{'WETH'}</option>
        </SwapDropdown>
      </SwapInputContainer>
      <SwapButton onClick={onClickSwap}>↓</SwapButton>
      <SwapInputContainer>
        <SwapInput type={'number'} placeholder={'0'} value={toTokenAmount} onChange={onChangeToTokenAmount} />
        <SwapDropdown value={toToken} onChange={onChangeToToken}>
          <option value={ESwapTokens.ETH}>{'ETH'}</option>
          <option value={ESwapTokens.GAL}>{'GAL'}</option>
          <option value={ESwapTokens.JOC}>{'JOC'}</option>
          <option value={ESwapTokens.WETH}>{'WETH'}</option>
        </SwapDropdown>
      </SwapInputContainer>
    </SwapContainer>
  )
}
