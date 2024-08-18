import React from 'react'
import { Button as ButtonBase, Row, Image, Header, Input, Button, Spacer } from '../Basic'
import { Container, RowBalance, RowButtonInput, TextBalance, TextError, ButtonDisconnect } from './styles'
import { ChainSwitcher, TChainSwitcherProps } from './ChainSwitcher'
import metamaskLogo from '../../../public/metamask-fox.png'

type TMetamaskProps = {
  address: string
  balanceWallet: string
  outEthError: string
  outEth: string
  connectWallet: () => void
  disconnectWallet: () => void
  sendEthToContract: () => void
  onChangeOutEth: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeChain: (id: number) => void
} & TChainSwitcherProps

export const Metamask: React.FC<TMetamaskProps> = ({
  address,
  activeChainId,
  availableChains,
  balanceWallet,
  outEth,
  connectWallet,
  disconnectWallet,
  sendEthToContract,
  onChangeChain,
  onChangeOutEth,
  outEthError
}) => {
  return (
    <Container>
      <Row>
        <Image source={metamaskLogo} alt="Metamask Logo" />
        <Header text="MetaMask" />
      </Row>
      <RowBalance>
        <ButtonBase buttonType="primary" onClick={connectWallet} disabled={!!address}>
          {!!address ? `Connected: ${address.substring(0, 6)}...${address.substring(38)}` : 'Connect Wallet'}
        </ButtonBase>
        {!!address && <TextBalance>{`Balance: ${balanceWallet ?? 0}`}</TextBalance>}
      </RowBalance>
      {!!address && (
        <ChainSwitcher availableChains={availableChains} activeChainId={activeChainId} onChangeChain={onChangeChain} />
      )}
      <Spacer height={10} />
      {!!address && (
        <RowButtonInput>
          <Button buttonType="primary" onClick={sendEthToContract}>
            {'Sent ETH'}
          </Button>
          <Input value={outEth} onChange={onChangeOutEth} />
          {!!outEthError && <TextError>{`Error: ${outEthError}`}</TextError>}
        </RowButtonInput>
      )}
      <Spacer height={10} />
      {!!address && (
        <ButtonDisconnect buttonType="primary" onClick={disconnectWallet}>
          {'Disconnect Wallet'}
        </ButtonDisconnect>
      )}
    </Container>
  )
}
