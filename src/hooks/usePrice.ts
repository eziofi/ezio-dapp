import { TOKEN_TYPE } from '../views/wallet/helpers/constant';
import { ezUSDPrice, ezMaticPrice } from '../views/wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';

export function usePrice(tokenType: TOKEN_TYPE) {
  const { ethersProvider } = useWallet();

  const netWorthApi: any = {
    [TOKEN_TYPE.ezUSD]: ezUSDPrice,
    [TOKEN_TYPE.ezMatic]: ezMaticPrice,
  };

  const { data: netWorth } = useQuery(
    ['networth', tokenType],
    () => netWorthApi[tokenType](ethersProvider!.getSigner()),
    {
      enabled: !!ethersProvider && (tokenType === TOKEN_TYPE.ezUSD || tokenType === TOKEN_TYPE.ezMatic),
    },
  );
  return { netWorth };
}
