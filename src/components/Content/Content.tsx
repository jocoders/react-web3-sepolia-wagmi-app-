import { Spacer } from '../Basic'
import { Body, Container } from './styles'

import { TabBarSwitcher } from '../TabbarSwitcher/TabbarSwitcher'
import { Metamask } from '../Metamask/Metamask'
import { useContentController } from './useContentController'
import { ContractBase } from '../ContractBase/ContractBase'
import { ContractUniswap } from '../ContractUniswap/ContractUniswap'

export function Content() {
  const {
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
    tabs,

    connectWallet,
    disconnectWallet,
    withdrawEthFromContract,
    sendEthToContract,
    onChangeOutEth,
    onChangeInEth,
    onChangeChain,
    onSwap,
    setActiveTab
  } = useContentController()

  return (
    <Body>
      <Container>
        <Metamask
          address={address as `0x${string}`}
          activeChainId={chainId}
          balanceWallet={balanceWallet}
          outEthError={outEthError}
          outEth={outEth}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          sendEthToContract={sendEthToContract}
          availableChains={availableChains}
          onChangeChain={onChangeChain}
          onChangeOutEth={onChangeOutEth}
        />
        <Spacer height={20} />
        <TabBarSwitcher activeTab={activeTab} tabs={tabs} onChangeTab={setActiveTab} />
        <Spacer height={20} />

        {isActiveUniswap && <ContractUniswap tokens={customTokens} onSwap={onSwap} />}
        {isActiveBasic && (
          <ContractBase
            contractOwner={contractOwner as string}
            balanceContract={balanceContract}
            withdrawEthFromContract={withdrawEthFromContract}
            inEth={inEth}
            onChangeInEth={onChangeInEth}
            inEthError={inEthError}
          />
        )}
      </Container>
    </Body>
  )
}
