import {
  ezatBalanceOf,
  ezbtBalanceOf,
  reverseCoinBalanceOf,
  usdcBalanceOf,
  usdtBalanceOf,
} from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from './useWallet';
import { NETWORK_TYPE, TOKEN_TYPE } from '../views/wallet/helpers/constant';
import { formatUnits } from 'ethers/lib/utils';
import { formatDecimal } from '../views/wallet/helpers/utilities';

export function useBalance(tokenType: TOKEN_TYPE) {
  const { account, ethersProvider, networkName } = useWallet();
  const balanceApi = {
    [TOKEN_TYPE.USDE]: ezatBalanceOf,
    [TOKEN_TYPE.E2LP]: ezbtBalanceOf,
    [TOKEN_TYPE.USDT]: usdtBalanceOf,
    [TOKEN_TYPE.USDC]: usdcBalanceOf,
    [TOKEN_TYPE.ReverseCoin]: reverseCoinBalanceOf,
  };
  const {
    data: balance,
    refetch: refetchBalance,
    isFetching,
  } = useQuery(
    ['balanceOf', tokenType],
    () => balanceApi[tokenType](ethersProvider!.getSigner(), account, networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!account && !!networkName,
    },
  );
  return { balance, refetchBalance, isBalanceFetching: isFetching };
}
