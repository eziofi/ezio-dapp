import { useQuery } from 'react-query';
import useWallet from '../views/hooks/useWallet';
import { NETWORK_TYPE, TOKEN_TYPE } from '../views/wallet/helpers/constant';
import { queryPurchaseRecord, queryRedeemRecord } from '../views/wallet/helpers/contract_call';

export function useRecord() {
  const { account, ethersProvider, networkName } = useWallet();
  const { data: purchaseEzatRecords } = useQuery(
    ['queryPurchaseRecord', account, TOKEN_TYPE.USDE],
    () => queryPurchaseRecord(ethersProvider!.getSigner(), account, TOKEN_TYPE.USDE, networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!networkName,
      onSuccess: data => {
        // debugger;
      },
    },
  );
  const { data: purchaseEzbtRecords } = useQuery(
    ['queryPurchaseRecord', account, TOKEN_TYPE.E2LP],
    () => queryPurchaseRecord(ethersProvider!.getSigner(), account, TOKEN_TYPE.E2LP, networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!networkName,
      onSuccess: data => {
        // debugger;
      },
    },
  );
  const { data: redeemRecords } = useQuery(
    ['queryRedeemRecord', account],
    () => queryRedeemRecord(ethersProvider!.getSigner(), account, networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!networkName,
      onSuccess: data => {
        // debugger;
      },
    },
  );

  return redeemRecords && purchaseEzbtRecords && purchaseEzatRecords
    ? [...redeemRecords, ...purchaseEzbtRecords, ...purchaseEzatRecords].sort((a, b) => b.timestamp - a.timestamp)
    : [];
}
