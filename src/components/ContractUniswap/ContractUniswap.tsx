import React from 'react'
import { Header, Image, Row, Spacer } from '../Basic'
import { SwapTokens, TSwapToken } from './SwapTokens'
import { SwapForm } from './SwapForm'
import { Container } from './styles'
import uniswapLogo from '../../../public/uniswap.png'
import { ESwapTokens } from '../../types/swap'

export type TSwapParams = {
  fromToken: ESwapTokens
  toToken: ESwapTokens
  fromAmount: bigint
  toAmount: bigint
}

export type TContractUniswapProps = {
  error?: string
  tokens: TSwapToken[]
  clearSwapError: () => void
  onSwap: (params: TSwapParams) => void
}

export const ContractUniswap: React.FC<TContractUniswapProps> = ({ tokens, onSwap, error, clearSwapError }) => {
  return (
    <Container>
      <Row>
        <Image source={uniswapLogo} alt="Uniswap Logo" />
        <Header text="Uniswap" />
      </Row>
      <SwapTokens tokens={tokens} />
      <Spacer height={10} />
      <SwapForm error={error} tokens={tokens} onSwap={onSwap} clearSwapError={clearSwapError} />
    </Container>
  )
}
