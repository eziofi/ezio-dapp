import { useQuery } from 'react-query';
import { queryPurchaseRecord, queryRedeemRecord } from '../views/wallet/helpers/contract_call';
import useWallet from '../views/hooks/useWallet';
import { TOKEN_TYPE } from '../views/wallet/helpers/constant';

export function useRecord() {
  const { account, ethersProvider } = useWallet();
  const { data: purchaseEzatRecords } = useQuery(
    ['queryPurchaseRecord', account, TOKEN_TYPE.EZAT],
    () => queryPurchaseRecord(ethersProvider!.getSigner(), account, TOKEN_TYPE.EZAT),
    {
      enabled: !!ethersProvider,
      onSuccess: data => {
        // debugger;
      },
    },
  );
  const { data: purchaseEzbtRecords } = useQuery(
    ['queryPurchaseRecord', account, TOKEN_TYPE.EZBT],
    () => queryPurchaseRecord(ethersProvider!.getSigner(), account, TOKEN_TYPE.EZBT),
    {
      enabled: !!ethersProvider,
      onSuccess: data => {
        // debugger;
      },
    },
  );
  const { data: redeemRecords } = useQuery(
    ['queryRedeemRecord', account],
    () => queryRedeemRecord(ethersProvider!.getSigner(), account),
    {
      enabled: !!ethersProvider,
      onSuccess: data => {
        // debugger;
      },
    },
  );

  return redeemRecords && purchaseEzbtRecords && purchaseEzatRecords
    ? [...redeemRecords, ...purchaseEzbtRecords, ...purchaseEzatRecords].sort((a, b) => b.timestamp - a.timestamp)
    : [];
}
