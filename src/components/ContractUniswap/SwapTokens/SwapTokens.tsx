import React from 'react'
import { PanelContainer, TokenContainer, TokenName, TokenAmount, CopyButton } from './styles'
import { ESwapTokens } from '../../../types/swap'

export type TSwapToken = {
  name: ESwapTokens
  amount: string
}

type TSwapTokensProps = {
  tokens: TSwapToken[]
}

export const SwapTokens: React.FC<TSwapTokensProps> = ({ tokens }) => {
  const handleCopy = (amount: string) => {
    navigator.clipboard.writeText(amount.toString())
    alert(`Copied ${amount} to clipboard`)
  }

  return (
    <PanelContainer>
      {tokens.map((token) => (
        <TokenContainer key={token.name}>
          <TokenName>{token.name}</TokenName>
          <TokenAmount>{token.amount}</TokenAmount>
          <CopyButton onClick={() => handleCopy(token.amount)}>📋</CopyButton>
        </TokenContainer>
      ))}
    </PanelContainer>
  )
}
