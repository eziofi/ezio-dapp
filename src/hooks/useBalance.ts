import {
  ezatBalanceOf,
  ezbtBalanceOf,
  stMaticBalanceOf,
  usdcBalanceOf,
  usdtBalanceOf,
} from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';
import { TOKEN_TYPE } from '../views/wallet/helpers/constant';
import { formatUnits } from 'ethers/lib/utils';
import { formatDecimal } from '../views/wallet/helpers/utilities';

export function useBalance(tokenType: TOKEN_TYPE) {
  const { account, ethersProvider } = useWallet();
  const balanceApi = {
    [TOKEN_TYPE.ezUSD]: ezatBalanceOf,
    [TOKEN_TYPE.ezMATIC]: ezbtBalanceOf,
    [TOKEN_TYPE.USDT]: usdtBalanceOf,
    [TOKEN_TYPE.USDC]: usdcBalanceOf,
    [TOKEN_TYPE.stMATIC]: stMaticBalanceOf,
  };
  const {
    data: balance,
    refetch: refetchBalance,
    isFetching,
  } = useQuery(['balanceOf', tokenType], () => balanceApi[tokenType](ethersProvider!.getSigner(), account), {
    enabled: !!ethersProvider && !!account,
  });
  return { balance, refetchBalance, isBalanceFetching: isFetching };
}
