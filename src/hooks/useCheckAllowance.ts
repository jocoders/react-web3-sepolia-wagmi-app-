import { useReadContract } from 'wagmi'
import { UNISWAP_CONTRACT_ADDRESS, UNISWAP_CONTRACT_ABI } from '../consts/contract'

export function useCheckAllowance(tokenName: string, user: `0x${string}`) {
  const { data: allowance } = useReadContract({
    address: UNISWAP_CONTRACT_ADDRESS,
    abi: UNISWAP_CONTRACT_ABI,
    functionName: 'checkAllowance',
    args: [tokenName, user]
  })

  return allowance ?? BigInt(0)
}
