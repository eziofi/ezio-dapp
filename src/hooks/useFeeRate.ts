import { redeemFeeRate } from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';

export function useFeeRate() {
  const { ethersProvider } = useWallet();

  const { data: feeRate } = useQuery(['redeemFeeRate'], () => redeemFeeRate(ethersProvider!.getSigner()), {
    enabled: !!ethersProvider,
  });
  return { feeRate };
}
