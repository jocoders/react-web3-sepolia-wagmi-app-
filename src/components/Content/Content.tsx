import React, { useEffect, useMemo, useState } from 'react'
import { useAccount, useConnect, useBalance } from 'wagmi'
import { GetBalanceReturnType, watchBlockNumber } from 'wagmi/actions'
import { Button, Col, Header, Image, Row, Text } from '../Basic'
import { RowBalance, Body, Container, TextBalance } from './styles'

import { disconnect, getChains, getBalance, getChainId, switchChain } from '@wagmi/core'

import { injected } from 'wagmi/connectors'

import metamaskLogo from '../../../public/metamask-fox.png'
import './styles1.css'
import { config } from '../../config'
import { ChainSwitcher } from '../ChainSwitcher/ChainSwitcher'

export function Content() {
  const [amountSent, setAmountSent] = useState(0)
  const [amountWithdraw, setAmountWithdraw] = useState(0)
  const [balance, setBalance] = useState<GetBalanceReturnType>()
  const [contract, setContract] = useState(null)
  const [contractOwner, setContractOwner] = useState(null)
  const [contractBalance, setContractBalance] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [network, setNetwork] = useState(null)
  const [signer, setSigner] = useState(null)

  const chains = getChains(config)
  const chainId = getChainId(config)

  const { address } = useAccount()
  const { connect } = useConnect()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (address) {
          const balanceResult = await getBalance(config, { address })
          setBalance(balanceResult)
        }
      } catch (error) {
        console.error('LOG: Error fetching balance:', error)
      }
    }

    fetchBalance()
  }, [address])

  console.log('***address', address)
  console.log('***chains', chains)
  console.log('***balance', balance)

  useEffect(() => {
    return watchBlockNumber(config, {
      onBlockNumber(blockNumber) {
        console.log('Block number changed!', blockNumber)
      }
    })
  }, [])

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
      console.log('LOG: Chain changed to', id)
    } catch (error) {
      console.error('LOG: Error switching chain:', error)
    }
  }

  const connectWallet = async () => {
    if (!address) {
      connect({ connector: injected() })
    }
  }

  const switchNetwork = () => {}
  const disconnectWallet = async () => {
    await disconnect(config)
  }
  const checkBalance = () => {}
  const checkIsOwner = () => {}
  const checkContractOwner = () => {}
  const sendMoneyToContract = () => {}
  const withdrawMoneyFromContract = () => {}
  const onChangeAmountInEth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountSent(e.target.value)
  }
  const onChangeWithdrawAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountWithdraw(e.target.value)
  }

  return (
    <Body>
      <Container>
        <Row>
          <Image source={metamaskLogo} alt="Metamask Logo" />
          <Header text="MetaMask" />
        </Row>
        <RowBalance>
          <Button buttonType="primary" onClick={connectWallet} disabled={!!address}>
            {!!address ? `Connected: ${address.substring(0, 6)}...${address.substring(38)}` : 'Connect Wallet'}
          </Button>
          <TextBalance>{`Balance: ${balance ? balance.formatted : 0} ${balance?.symbol ?? ''}`}</TextBalance>
        </RowBalance>
        <ChainSwitcher availableChains={availableChains} activeChainId={chainId} onChangeChain={onChangeChain} />
      </Container>
      {/* <nav className="navbar">
        <div className="container">
          <div className="title-container">
            <img src={metamaskLogo} alt="MetaMask Fox" className="metamask-logo" />
            <h1 className="navbar-item is-size-4">{'MetaMask:'}</h1>
          </div>

          <RowBalance>
            <Button buttonType="primary" onClick={connectWallet} disabled={!!address}>
              {!!address ? `Connected: ${address.substring(0, 6)}...${address.substring(38)}` : 'Connect Wallet'}
            </Button>
            <Text>Balance</Text>
          </RowBalance>

          <div id="navbarMenu" className="navbar-menu">
            <div className="row">
              {!!balance && (
                <div className="balance-box">
                  <span className="is-link has-text-weight-bold">{`Balance: ${balance}`}</span>
                </div>
              )}
            </div>

            {!!network?.name && (
              <div className="navbar-end is-align-items-center mt-10">
                <button className="button is-white connect-wallet button-container" onClick={switchNetwork}>
                  <span className="is-link has-text-weight-bold">{`Network: ${network?.name}`}</span>
                </button>
              </div>
            )}
          </div>

          {!!address && (
            <div className="row">
              <button className="button is-white connect-wallet mt-10 button-container" onClick={disconnectWallet}>
                <span className="is-link has-text-weight-bold">{'Disconnect'}</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">{'Test Sepolia contract:'}</h1>
          </div>
        </div>

        <div className="row">
          <div className="navbar-end is-align-items-center">
            <button className="button is-white connect-wallet button-container" onClick={checkBalance}>
              <span className="is-link has-text-weight-bold">{'Check Balance'}</span>
            </button>
          </div>
          {!!contractBalance && (
            <div className="balance-box">
              <span className="is-link has-text-weight-bold">{`Balance: ${contractBalance}`}</span>
            </div>
          )}
        </div>

        <div className="row mt-5">
          <div className="navbar-end is-align-items-center">
            <button className="button is-white connect-wallet button-container" onClick={checkIsOwner}>
              <span className="is-link has-text-weight-bold">{'Check Is Owner'}</span>
            </button>
          </div>
          <div className="balance-box">
            <span className="is-link has-text-weight-bold">{`isOwner: ${isOwner}`}</span>
          </div>
        </div>

        <div className="row mt-5">
          <div className="navbar-end is-align-items-center">
            <button className="button is-white connect-wallet button-container" onClick={checkContractOwner}>
              <span className="is-link has-text-weight-bold">{'Check Contract Owner'}</span>
            </button>
          </div>
          <div className="balance-box">
            <span className="is-link has-text-weight-bold">{`Contract owner: ${contractOwner ?? ''}`}</span>
          </div>
        </div>

        <div className="row mt-5">
          <button className="button is-white connect-wallet button-container" onClick={sendMoneyToContract}>
            <span className="is-link has-text-weight-bold">{'Send Money to Contract'}</span>
          </button>
          <input value={amountSent} onChange={onChangeAmountInEth} type="text" id="amount" />
        </div>

        <div className="row mt-5">
          <button className="button is-white connect-wallet button-container" onClick={withdrawMoneyFromContract}>
            <span className="is-link has-text-weight-bold">{'Withdraw Money from Contract'}</span>
          </button>
          <input value={amountWithdraw} onChange={onChangeWithdrawAmount} type="text" id="withdrawAmount" />
        </div>
      </nav> */}
    </Body>
  )
}
