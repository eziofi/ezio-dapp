import { ezatBalanceOf, ezbtBalanceOf, usdcBalanceOf, usdtBalanceOf } from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';
import { TOKEN_TYPE } from '../views/wallet/helpers/constant';

export function useBalance(tokenType: TOKEN_TYPE) {
  const { account, ethersProvider } = useWallet();
  const balanceApi = {
    [TOKEN_TYPE.EZAT]: ezatBalanceOf,
    [TOKEN_TYPE.EZBT]: ezbtBalanceOf,
    [TOKEN_TYPE.USDT]: usdtBalanceOf,
    [TOKEN_TYPE.USDC]: usdcBalanceOf,
    [TOKEN_TYPE.StMatic]: usdtBalanceOf,
  };
  const { data: balance, refetch: refetchBalance } = useQuery(
    ['balanceOf', tokenType],
    () => balanceApi[tokenType](ethersProvider!.getSigner(), account),
    {
      enabled: !!ethersProvider && !!account,
    },
  );
  return { balance, refetchBalance };
}
