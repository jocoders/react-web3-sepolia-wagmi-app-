import { useEffect, useMemo, useState } from 'react'
import { useAccount, useConnect, useBalance, useReadContract, useWriteContract } from 'wagmi'
import { watchBlockNumber } from 'wagmi/actions'
import { Button as ButtonBase, Header, Input, Image, Row, Spacer, Text } from '../Basic'
import { Button, RowBalance, Body, Container, TextBalance, RowButtonInput, TextError } from './styles'

import { disconnect, getChains, getChainId, switchChain, sendTransaction, simulateContract } from '@wagmi/core'
import { parseEther, formatEther } from 'viem'

import { injected } from 'wagmi/connectors'

import metamaskLogo from '../../../public/metamask-fox.png'
import sepoliaLogo from '../../../public/sepolia.png'
import './styles1.css'
import { config } from '../../config'
import { ChainSwitcher } from '../ChainSwitcher/ChainSwitcher'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../consts/contract'

export function Content() {
  const chains = getChains(config)
  const chainId = getChainId(config)
  const [inEth, setInEth] = useState('')
  const [outEth, setOutEth] = useState('')
  const [inEthError, setInEthError] = useState('')
  const [outEthError, setOutEthError] = useState('')

  const { address } = useAccount()
  const { connect } = useConnect()

  const { data: balance } = useBalance({ address })
  const { writeContract } = useWriteContract()

  useEffect(() => {
    return watchBlockNumber(config, {
      onBlockNumber(blockNumber) {
        console.log('Block number changed!', blockNumber)
      }
    })
  }, [])

  const { data: balanceContract } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getBalance',
    args: []
  })

  const { data: contractOwner } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'owner',
    args: []
  })

  const availableChains = useMemo(() => {
    return chains.map((item) => {
      return {
        id: item.id,
        name: item.name
      }
    })
  }, [chains])

  const onChangeChain = async (id: number) => {
    try {
      await switchChain(config, { chainId: id as 1 | 11155111 })
    } catch (error) {
      console.error('LOG: Error switching chain:', error)
    }
  }

  const connectWallet = async () => {
    if (!address) {
      connect({ connector: injected() })
    }
  }

  const disconnectWallet = async () => {
    await disconnect(config)
  }

  const withdrawEthFromContract = async () => {
    try {
      const { request } = await simulateContract(config, {
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'withdraw',
        args: [address, parseEther(inEth)]
      })

      const hash = writeContract(config, request)
      console.log('hash', hash)

      setInEth('')
    } catch (error) {
      setInEthError('Error withdrawing ETH')
      console.error('Error withdrawing ETH:', error)
    }
  }

  const sendEthToContract = async () => {
    try {
      await sendTransaction(config, {
        to: CONTRACT_ADDRESS,
        value: parseEther(outEth)
      })
      setOutEth('')
    } catch (error) {
      setOutEthError('Error sending ETH')
      console.error('Error sending ETH:', error)
    }
  }

  const onChangeOutEth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutEthError('')
    setOutEth(e.target.value)
  }

  const onChangeInEth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInEthError('')
    setInEth(e.target.value)
  }

  return (
    <Body>
      <Container>
        <Row>
          <Image source={metamaskLogo} alt="Metamask Logo" />
          <Header text="MetaMask" />
        </Row>
        <RowBalance>
          <ButtonBase buttonType="primary" onClick={connectWallet} disabled={!!address}>
            {!!address ? `Connected: ${address.substring(0, 6)}...${address.substring(38)}` : 'Connect Wallet'}
          </ButtonBase>
          {!!balance && (
            <TextBalance>{`Balance: ${balance ? balance.formatted : 0} ${balance?.symbol ?? ''}`}</TextBalance>
          )}
        </RowBalance>
        {!!address && (
          <ChainSwitcher availableChains={availableChains} activeChainId={chainId} onChangeChain={onChangeChain} />
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
          <Button buttonType="primary" onClick={disconnectWallet}>
            {'Disconnect Wallet'}
          </Button>
        )}
        <Spacer height={40} />
        <Row>
          <Image source={sepoliaLogo} alt="Sepolia Logo" />
          <Header text="Sepolia Contract" />
        </Row>
        <Spacer height={4} />
        {!!contractOwner && typeof contractOwner === 'string' && (
          <Text>{`Contract owner: ${contractOwner?.substring(0, 6)}...${contractOwner?.substring(38)}`}</Text>
        )}
        <Spacer height={4} />
        <Text>{`Contract address: ${CONTRACT_ADDRESS}`}</Text>
        <Spacer height={4} />
        <Text>{`Contract balance: ${
          balanceContract && typeof balanceContract === 'bigint' ? formatEther(balanceContract) : 0
        }`}</Text>
        <Spacer height={4} />
        <RowButtonInput>
          <Button buttonType="primary" onClick={withdrawEthFromContract}>
            {'Withdraw ETH'}
          </Button>
          <Input value={inEth} onChange={onChangeInEth} />
          {!!inEthError && <TextError>{`Error: ${inEthError}`}</TextError>}
        </RowButtonInput>
      </Container>
    </Body>
  )
}
