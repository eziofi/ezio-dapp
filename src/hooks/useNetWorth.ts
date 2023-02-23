import { TOKEN_TYPE } from '../views/wallet/helpers/constant';
import { ezatNetWorth, ezbtNetWorth } from '../views/wallet/helpers/contract_call';
import { BigNumber } from 'ethers';
import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';

export function useNetWorth(tokenType: TOKEN_TYPE) {
  const { ethersProvider } = useWallet();

  const netWorthApi: any = {
    [TOKEN_TYPE.EZAT]: ezatNetWorth,
    [TOKEN_TYPE.EZBT]: ezbtNetWorth,
  };

  const { data: netWorth } = useQuery(
    ['networth', tokenType],
    () => netWorthApi[tokenType](ethersProvider!.getSigner()),
    {
      enabled: !!ethersProvider,
    },
  );
  return { netWorth };
}
