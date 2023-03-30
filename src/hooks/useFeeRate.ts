import { redeemFeeRate } from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';
import { NETWORK_TYPE } from '../views/wallet/helpers/constant';

export function useFeeRate() {
  const { ethersProvider, networkName } = useWallet();

  const { data: feeRate } = useQuery(
    ['redeemFeeRate'],
    () => redeemFeeRate(ethersProvider!.getSigner(), networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!networkName,
    },
  );
  return { feeRate };
}
