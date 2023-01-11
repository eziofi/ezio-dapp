import { TOKEN_BALANCE_TYPE } from '../views/wallet/helpers/constant';
import { ezatBalanceOf, ezbtBalanceOf, usdtBalanceOf } from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';

export function useBalance(tokenType: keyof typeof TOKEN_BALANCE_TYPE) {
  const { account, ethersProvider } = useWallet();
  const balanceApi = {
    [TOKEN_BALANCE_TYPE.EZAT]: ezatBalanceOf,
    [TOKEN_BALANCE_TYPE.EZBT]: ezbtBalanceOf,
    [TOKEN_BALANCE_TYPE.USDT]: usdtBalanceOf,
  };
  const { data: balance, refetch: refetchBalance } = useQuery(
    ['balanceOf', tokenType],
    () => balanceApi[tokenType](ethersProvider!.getSigner(), account),
    {
      enabled: !!ethersProvider,
    },
  );
  return { balance, refetchBalance };
}
