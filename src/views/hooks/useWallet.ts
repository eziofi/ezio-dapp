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
    networkId,
  } = useContext(WalletContext);

  const reverseCoin = networkId ? REVERSE_COIN[NETWORK_ID[networkId] as keyof typeof REVERSE_COIN] : '';

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
    networkId,
  };
}
