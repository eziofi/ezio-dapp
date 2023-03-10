import { TOKEN_TYPE } from '../views/wallet/helpers/constant';
import { ezUSDPrice, ezMaticPrice, usdcPrice, usdtPrice, stMaticPrice } from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';

export function usePrice(tokenType: TOKEN_TYPE) {
  const { ethersProvider } = useWallet();

  const netWorthApi = {
    [TOKEN_TYPE.ezUSD]: ezUSDPrice,
    [TOKEN_TYPE.ezMATIC]: ezMaticPrice,
    [TOKEN_TYPE.USDC]: usdcPrice,
    [TOKEN_TYPE.USDT]: usdtPrice,
    [TOKEN_TYPE.stMATIC]: stMaticPrice,
  };

  const { data: price, refetch: refetchPrice } = useQuery(
    ['price', tokenType],
    () => netWorthApi[tokenType](ethersProvider!.getSigner()),
    {
      enabled: !!ethersProvider,
    },
  );
  return { price, refetchPrice };
}
