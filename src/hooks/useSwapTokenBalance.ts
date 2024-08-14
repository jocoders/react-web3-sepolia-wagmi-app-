import { useReadContract } from 'wagmi'
import { UNISWAP_CONTRACT_ADDRESS, UNISWAP_CONTRACT_ABI } from '../consts/contract'
import { formatUnits } from 'viem'
import { ESwapTokens } from '../types/swap'

export function useCustomTokensBalance(account: `0x${string}`) {
  if (!account) return { galBalance: '0', jocBalance: '0', wethBalance: '0' }

  const galBalance = extractBalance(account, ESwapTokens.GAL)
  const jocBalance = extractBalance(account, ESwapTokens.JOC)
  const wethBalance = extractBalance(account, ESwapTokens.WETH)

  return {
    galBalance: formatBalance(galBalance),
    jocBalance: formatBalance(jocBalance),
    wethBalance: formatBalance(wethBalance)
  }
}

const extractBalance = (account: `0x${string}`, token: string) => {
  const { data } = useReadContract({
    address: UNISWAP_CONTRACT_ADDRESS,
    abi: UNISWAP_CONTRACT_ABI,
    functionName: 'getBalance',
    args: [token, account]
  })

  return data
}

const formatBalance = (value?: bigint | unknown) => {
  return value && typeof value === 'bigint' ? formatUnits(value, 18) : '0'
}
