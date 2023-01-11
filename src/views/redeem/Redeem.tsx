import { useState } from 'react';

import TokenTabs from '../purchase/components/TokenTabs';
import { TransactionForm } from '../../components/TransactionForm';
import { TOKEN_TYPE, TRANSFER_TYPE } from '../wallet/helpers/constant';
import styles from '../purchase/purchase.module.less';

export default function Redeem() {
  const [tab, setTab] = useState(0);

  return (
    <div className={styles.purchaseTab}>
      <TokenTabs tab={tab} tabChange={tab => setTab(tab)} />
      <TransactionForm
        transactionType={TRANSFER_TYPE.REDEEM}
        tokenType={tab === 0 ? TOKEN_TYPE.EZAT : TOKEN_TYPE.EZBT}
        setTipDrawerOpened={() => {}}
      />
    </div>
  );
}
