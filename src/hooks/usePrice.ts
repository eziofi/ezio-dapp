import { NETWORK_TYPE, TOKEN_TYPE } from '../views/wallet/helpers/constant';
import { USDEPrice, E2LPPrice, usdcPrice, usdtPrice, reverseCoinPrice } from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from './useWallet';

export function usePrice(tokenType: TOKEN_TYPE) {
  const { ethersProvider, networkName } = useWallet();

  const netWorthApi = {
    [TOKEN_TYPE.USDE]: USDEPrice,
    [TOKEN_TYPE.E2LP]: E2LPPrice,
    [TOKEN_TYPE.USDC]: usdcPrice,
    [TOKEN_TYPE.USDT]: usdtPrice,
    [TOKEN_TYPE.ReverseCoin]: reverseCoinPrice,
  };

  const {
    data: price,
    refetch: refetchPrice,
    isFetching,
  } = useQuery(
    ['price', tokenType],
    () => netWorthApi[tokenType](ethersProvider!.getSigner(), networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!networkName,
    },
  );
  return { price, refetchPrice, isPriceFetching: isFetching };
}
