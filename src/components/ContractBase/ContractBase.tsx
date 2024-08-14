import React from 'react'
import { Button, Header, Image, Input, Row, Spacer, Text } from '../Basic'
import { Container, RowButtonInput, TextError } from './styles'
import sepoliaLogo from '../../../public/sepolia.png'
import { BASIC_CONTRACT_ADDRESS } from '../../consts/contract'

type TContractBaseProps = {
  contractOwner: string
  balanceContract: string
  withdrawEthFromContract: () => void
  inEth: string
  onChangeInEth: (e: React.ChangeEvent<HTMLInputElement>) => void
  inEthError: string
}

export const ContractBase: React.FC<TContractBaseProps> = ({
  contractOwner,
  balanceContract,
  withdrawEthFromContract,
  inEth,
  onChangeInEth,
  inEthError
}) => {
  return (
    <Container>
      <Row>
        <Image source={sepoliaLogo} alt="Sepolia Logo" />
        <Header text="Sepolia Contract" />
      </Row>
      <Spacer height={4} />
      {!!contractOwner && typeof contractOwner === 'string' && (
        <Text>{`Contract owner: ${contractOwner?.substring(0, 6)}...${contractOwner?.substring(38)}`}</Text>
      )}
      <Spacer height={4} />
      <Text>{`Contract address: ${BASIC_CONTRACT_ADDRESS}`}</Text>
      <Spacer height={4} />
      <Text>{`Contract balance: ${balanceContract ?? 0}`}</Text>
      <Spacer height={4} />
      <RowButtonInput>
        <Button buttonType="primary" onClick={withdrawEthFromContract}>
          {'Withdraw ETH'}
        </Button>
        <Input value={inEth} onChange={onChangeInEth} />
        {!!inEthError && <TextError>{`Error: ${inEthError}`}</TextError>}
      </RowButtonInput>
    </Container>
  )
}
