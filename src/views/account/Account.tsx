import { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import AccountDetail from './AccountDetail';
import { TOKEN_TYPE } from '../wallet/helpers/constant';
import { useTranslation } from 'react-i18next';
import { PurchaseContainer } from '../purchase/PurchaseStyle';
import { AccountCardBox, AccountToolBar} from './AccountStyle';
import BaseIconFont from '../components/BaseIconFont';
import AccountTokenCard from '../components/AccountTokenCard';
import CachedIcon from '@mui/icons-material/Cached';

export default function Account() {
  const [page, setPage] = useState('account');
  const { t } = useTranslation();
  const [refreshFlag, setRefreshFlag] = useState(0);

  return (
    <PurchaseContainer>
      <AccountToolBar>
        <Typography variant="h6" component="div">
          {page === 'account' ? t('account.balance') : t('account.detail')}
        </Typography>
        {page === 'account' ? (
          <IconButton
            aria-label="refresh"
            onClick={() => {
              setRefreshFlag(refreshFlag + 1);
            }}
          >
            <CachedIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setPage('account')}>
            <BaseIconFont name="icon-chexiao" style={{ width: 20, height: 20 }} />
          </IconButton>
        )}
      </AccountToolBar>

      {page === 'account' ? (
        <AccountCardBox>
          <AccountTokenCard type={TOKEN_TYPE.USDT} refreshFlag={refreshFlag} />
          <AccountTokenCard type={TOKEN_TYPE.USDC} refreshFlag={refreshFlag} />
          <AccountTokenCard type={TOKEN_TYPE.ReverseCoin} refreshFlag={refreshFlag} />
          <AccountTokenCard type={TOKEN_TYPE.USDE} refreshFlag={refreshFlag} />
          <AccountTokenCard type={TOKEN_TYPE.E2LP} refreshFlag={refreshFlag} />
        </AccountCardBox>
      ) : (
        <AccountDetail />
      )}
    </PurchaseContainer>
  );
}
