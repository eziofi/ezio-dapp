import { useContext } from 'react';
import { WalletContext } from '../context/WalletProvider';
import { NETWORK_ID, REVERSE_COIN } from '../wallet/helpers/constant';

export default function useWallet() {
  const {
    connectState,
    connect,
    disconnect,
    ethersProvider,
    walletProvider,
    account,
    allowanceUSDT,
    allowanceUSDC,
    // networkId,
    networkName,
    switchNetwork,
  } = useContext(WalletContext);

  const reverseCoin = networkName ? REVERSE_COIN[networkName as keyof typeof REVERSE_COIN] : '';

  return {
    connectState,
    connect,
    disconnect,
    ethersProvider,
    walletProvider,
    account,
    allowanceUSDT,
    allowanceUSDC,
    reverseCoin,
    // networkId,
    networkName,
    switchNetwork,
  };
}
