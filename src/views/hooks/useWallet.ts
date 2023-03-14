import { useContext } from 'react';
import { WalletContext } from '../context/WalletProvider';

export default function useWallet() {
  const { connectState, connect, disconnect, ethersProvider, walletProvider, account, allowanceUSDT, allowanceUSDC } =
    useContext(WalletContext);

  return { connectState, connect, disconnect, ethersProvider, walletProvider, account, allowanceUSDT, allowanceUSDC };
}
