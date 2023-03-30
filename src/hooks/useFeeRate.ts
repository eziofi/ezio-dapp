import { redeemFeeRate } from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';
import { NETWORK_TYPE, TOKEN_TYPE } from '../views/wallet/helpers/constant';

export function useFeeRate(tokenType: TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP) {
  const { ethersProvider, networkName } = useWallet();

  const { data: feeRate } = useQuery(
    ['redeemFeeRate', tokenType],
    () => redeemFeeRate(ethersProvider!.getSigner(), networkName as NETWORK_TYPE, tokenType),
    {
      enabled: !!ethersProvider && !!networkName,
    },
  );
  return { feeRate };
}
