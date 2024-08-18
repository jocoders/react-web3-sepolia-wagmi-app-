import { useEffect, useMemo, useState } from 'react'
import { useAccount, useConnect, useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi'

import {
  disconnect,
  getChains,
  getChainId,
  switchChain,
  sendTransaction,
  simulateContract,
  getBalance
} from '@wagmi/core'
import { Abi, parseEther } from 'viem'

import { injected } from 'wagmi/connectors'
import { config } from '../../config'

import {
  BASIC_CONTRACT_ADDRESS,
  BASIC_CONTRACT_ABI,
  UNISWAP_CONTRACT_ADDRESS,
  UNISWAP_CONTRACT_ABI,
  ERC20_ABI
} from '../../consts/contract'
import { TABS, ETabs } from '../../consts/token'
import { useCustomTokensBalance } from '../../hooks/useSwapTokenBalance'
import { ESwapTokens } from '../../types/swap'
import { TSwapParams } from '../ContractUniswap/ContractUniswap'
import { useCheckAllowance } from '../../hooks/useCheckAllowance'

export function useContentController() {
  const chains = getChains(config)
  const chainId = getChainId(config)
  const [inEth, setInEth] = useState('')
  const [outEth, setOutEth] = useState('')
  const [inEthError, setInEthError] = useState('')
  const [outEthError, setOutEthError] = useState('')
  const [activeTab, setActiveTab] = useState(TABS[1])

  const [balanceContract, setBalanceContract] = useState('')
  const [balanceWallet, setBalanceWallet] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const [swapError, setSwapError] = useState('')

  const isActiveBasic = activeTab === ETabs.BASE_CONTRACT
  const isActiveUniswap = activeTab === ETabs.UNISWAP_CONTRACT

  const { address } = useAccount()
  const { connect } = useConnect()
  const { galBalance, jocBalance, wethBalance } = useCustomTokensBalance(address as `0x${string}`)
  const { writeContract } = useWriteContract()

  const galAllowance = useCheckAllowance(ESwapTokens.GAL, address as `0x${string}`)
  const jocAllowance = useCheckAllowance(ESwapTokens.JOC, address as `0x${string}`)
  const wethAllowance = useCheckAllowance(ESwapTokens.WETH, address as `0x${string}`)

  useEffect(() => {
    const getBalanceContract = async () => {
      try {
        const balContract = await getBalance(config, {
          address: BASIC_CONTRACT_ADDRESS
        })

        const balWallet = await getBalance(config, {
          address: address as `0x${string}`
        })
        setBalanceContract(balContract.formatted)
        setBalanceWallet(balWallet.formatted)
      } catch (error) {
        console.error('Error fetching balances:', error)
      }
    }

    if (address) {
      getBalanceContract()
    }
  }, [address, transactionHash])

  const { data: galAddress } = useReadContract({
    address: UNISWAP_CONTRACT_ADDRESS,
    abi: UNISWAP_CONTRACT_ABI,
    functionName: 'getTokenAddress',
    args: [ESwapTokens.GAL]
  })
  const { data: jocAddress } = useReadContract({
    address: UNISWAP_CONTRACT_ADDRESS,
    abi: UNISWAP_CONTRACT_ABI,
    functionName: 'getTokenAddress',
    args: [ESwapTokens.JOC]
  })
  const { data: wethAddress } = useReadContract({
    address: UNISWAP_CONTRACT_ADDRESS,
    abi: UNISWAP_CONTRACT_ABI,
    functionName: 'getTokenAddress',
    args: [ESwapTokens.WETH]
  })

  useWatchContractEvent({
    address: BASIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: BASIC_CONTRACT_ABI,
    eventName: 'Deposit',
    onLogs(logs) {
      console.log('DEPOSIT LOGS: ', logs)
      setTransactionHash(logs[0].transactionHash ?? '')
    }
  })
  useWatchContractEvent({
    address: BASIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: BASIC_CONTRACT_ABI,
    eventName: 'Withdrawal',
    onLogs(logs) {
      console.log('WITHDRAW LOGS: ', logs)
      setTransactionHash(logs[0].transactionHash ?? '')
    }
  })

  const increaseAllowance = async (tokenAddress: string, amount: bigint) => {
    const { request } = await simulateContract(config, {
      abi: ERC20_ABI as Abi,
      address: tokenAddress as `0x${string}`,
      functionName: 'approve',
      args: [UNISWAP_CONTRACT_ADDRESS, amount]
    })

    await writeContract(request)
  }

  const upAllowance = async (token: string, amount: bigint) => {
    let allowance = galAllowance
    let tokenAddress = galAddress

    if (token === ESwapTokens.JOC) {
      allowance = jocAllowance
      tokenAddress = jocAddress
    } else if (token === ESwapTokens.WETH) {
      allowance = wethAllowance
      tokenAddress = wethAddress
    }

    if (typeof tokenAddress === 'string' && typeof allowance === 'bigint' && allowance < amount) {
      await increaseAllowance(tokenAddress, amount - allowance)
    }
  }

  const { data: contractOwner } = useReadContract({
    address: BASIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: BASIC_CONTRACT_ABI,
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

  const checkSwapParams = (params: TSwapParams) => {
    const { fromToken, toToken, fromAmount, toAmount } = params
    if (fromAmount <= 0 || toAmount <= 0) {
      setSwapError('Amounts must be greater than 0')
      return false
    } else if (fromToken === toToken) {
      setSwapError('From and to tokens must be different')
      return false
    } else if (fromToken === ESwapTokens.ETH && fromAmount > parseEther(balanceWallet)) {
      setSwapError('Not enough balance')
      return false
    }
    return true
  }

  const onSwap = async (params: TSwapParams) => {
    if (!checkSwapParams(params)) {
      return
    }

    try {
      const { fromToken, toToken, fromAmount, toAmount } = params
      if (fromToken === ESwapTokens.ETH) {
        const { request } = await simulateContract(config, {
          abi: UNISWAP_CONTRACT_ABI,
          address: UNISWAP_CONTRACT_ADDRESS,
          functionName: 'swapEthToToken',
          args: [toToken],
          value: fromAmount
        })

        await writeContract(request)
      } else if (toToken === ESwapTokens.ETH) {
        await upAllowance(fromToken, fromAmount)

        const { request } = await simulateContract(config, {
          abi: UNISWAP_CONTRACT_ABI,
          address: UNISWAP_CONTRACT_ADDRESS,
          functionName: 'swapTokenToEth',
          args: [fromToken, fromAmount]
        })

        await writeContract(request)
      } else {
        await upAllowance(fromToken, fromAmount)
        await upAllowance(toToken, toAmount)

        const { request } = await simulateContract(config, {
          abi: UNISWAP_CONTRACT_ABI,
          address: UNISWAP_CONTRACT_ADDRESS,
          functionName: 'swapTokenToToken',
          args: [fromToken, toToken, fromAmount]
        })

        await writeContract(request)
      }
    } catch (error) {
      console.error('Error swapping ETH to token:', error)
    }
  }

  const withdrawEthFromContract = async () => {
    try {
      const { request } = await simulateContract(config, {
        abi: BASIC_CONTRACT_ABI,
        address: BASIC_CONTRACT_ADDRESS,
        functionName: 'withdraw',
        args: [address, parseEther(inEth)]
      })

      const hash = writeContract(request)
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
        to: BASIC_CONTRACT_ADDRESS,
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

  const customTokens = useMemo(() => {
    return [
      { name: ESwapTokens.GAL, amount: galBalance },
      { name: ESwapTokens.JOC, amount: jocBalance },
      { name: ESwapTokens.WETH, amount: wethBalance }
    ]
  }, [galBalance, jocBalance, wethBalance])

  return {
    address,
    activeTab,
    availableChains,
    balanceContract,
    balanceWallet,
    chainId,
    contractOwner,
    customTokens,
    inEth,
    inEthError,
    isActiveBasic,
    isActiveUniswap,
    outEth,
    outEthError,
    swapError,
    tabs: TABS,

    clearSwapError: () => setSwapError(''),
    connectWallet,
    disconnectWallet,
    withdrawEthFromContract,
    sendEthToContract,
    onSwap,
    onChangeOutEth,
    onChangeInEth,
    onChangeChain,
    setActiveTab
  }
}
