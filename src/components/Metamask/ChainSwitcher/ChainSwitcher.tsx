import React, { useMemo } from 'react'
import {
  ChainSwitcherContainer,
  RowCurrentChain,
  ButtonCurrentChain,
  ColLetter,
  DropdownContent,
  DropdownItem,
  Text
} from './styles'

export type TChainSwitcherProps = {
  availableChains: { id: number; name: string }[]
  activeChainId: number
  onChangeChain: (id: number) => void
}

export const ChainSwitcher: React.FC<TChainSwitcherProps> = ({ availableChains, activeChainId, onChangeChain }) => {
  const handleChainSelect = (chain: { id: number; name: string }) => {
    onChangeChain(chain.id)
    console.log(`LOG: Switched to ${chain.name}`)
  }

  const currentChain = useMemo(() => {
    return availableChains.find((chain) => chain.id === activeChainId)
  }, [activeChainId, availableChains])

  return (
    <ChainSwitcherContainer>
      <ButtonCurrentChain>
        <RowCurrentChain>
          <ColLetter>{currentChain?.name.charAt(0)}</ColLetter>
          <Text>{currentChain?.name}</Text>
        </RowCurrentChain>
      </ButtonCurrentChain>
      <DropdownContent>
        {availableChains.map((chain) => (
          <DropdownItem key={chain.id} onClick={() => handleChainSelect(chain)}>
            <Text>{chain.name}</Text>
          </DropdownItem>
        ))}
      </DropdownContent>
    </ChainSwitcherContainer>
  )
}
