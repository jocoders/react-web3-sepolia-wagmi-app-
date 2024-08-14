import React from 'react'
import { Header, Image, Row, Spacer } from '../Basic'
import { SwapTokens, TSwapToken } from './SwapTokens/SwapTokens'
import { SwapForm } from './SwapForm/SwapForm'
import { Container } from './styles'
import uniswapLogo from '../../../public/uniswap.png'
import { ESwapTokens } from '../../types/swap'

export type TSwapParams = {
  fromToken: ESwapTokens
  toToken: ESwapTokens
  fromTokenAmount: string
  toTokenAmount: string
}

export type TContractUniswapProps = {
  tokens: TSwapToken[]
  onSwap: (params: TSwapParams) => void
}

export const ContractUniswap: React.FC<TContractUniswapProps> = ({ tokens, onSwap }) => {
  return (
    <Container>
      <Row>
        <Image source={uniswapLogo} alt="Uniswap Logo" />
        <Header text="Uniswap" />
      </Row>
      <SwapTokens tokens={tokens} />
      <Spacer height={10} />
      <SwapForm tokens={tokens} onSwap={onSwap} />
    </Container>
  )
}
