import TokenTabs from './components/TokenTabs';
import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import styles from './purchase.module.less';
import TextField from '@mui/material/TextField';
import { Button, Link, Snackbar } from '@mui/material';
import PurchaseRecordTable from './components/PurchaseRecordTable';
import PurchaseDrawer from './components/PurchaseDrawer';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { ezatNetWorth, ezbtNetWorth, purchase, usdtBalanceOf } from '../wallet/helpers/contract_call';
import { Signer } from 'ethers';
import { TOKEN_TYPE, TRANSFER_TYPE } from '../wallet/helpers/constant';
import useWallet from '../hooks/useWallet';
import { formatNetWorth, formatNum, timestampFormat } from '../wallet/helpers/utilities';
import { useTranslation } from 'react-i18next';
import { TransactionForm } from '../../components/TransactionForm';

export default function Purchase() {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [tipDrawerOpened, setTipDrawerOpened] = useState(false);

  return (
    <div className={styles.purchaseTab}>
      <TokenTabs tab={tab} tabChange={tab => setTab(tab)} />
      <TransactionForm
        transactionType={TRANSFER_TYPE.PURCHASE}
        tokenType={tab === 0 ? TOKEN_TYPE.EZAT : TOKEN_TYPE.EZBT}
        setTipDrawerOpened={setTipDrawerOpened}
      />
      <PurchaseDrawer opened={tipDrawerOpened} close={() => setTipDrawerOpened(false)} />
    </div>
  );
}
