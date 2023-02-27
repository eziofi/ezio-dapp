import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Card, CardContent, IconButton, Tooltip } from '@mui/material';
import AccountDetail from './AccountDetail';
import useWallet from '../hooks/useWallet';
import { TOKEN_TYPE } from '../wallet/helpers/constant';
import { useTranslation } from 'react-i18next';
import { PurchaseContainer } from '../purchase/PurchaseStyle';
import { AccountCard, AccountCardBox, AccountToolBar, Content } from './AccountStyle';
import BaseIconFont from '../components/BaseIconFont';
import TokenCard from '../components/AccountTokenCard';

export default function Account() {
  const [page, setPage] = useState('account');
  const { t } = useTranslation();

  return (
    <PurchaseContainer>
      <AccountToolBar>
        <Typography variant="h6" component="div">
          {page === 'account' ? t('account.balance') : t('account.detail')}
        </Typography>
        {page === 'account' ? (
          // <Button color="inherit" >
          //   {t('account.checkDetail')}
          // </Button>
          <Tooltip title={t('account.detail')} placement="top">
            <IconButton onClick={() => setPage('detail')}>
              <BaseIconFont name="icon-jiaofeizhangdan_active" style={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton onClick={() => setPage('account')}>
            {/* <img src={rollbackIcon} width="24" style={{ background: 'red' }} /> */}
            {/* <ReplyIcon /> */}
            <BaseIconFont name="icon-chexiao" style={{ width: 20, height: 20 }} />
          </IconButton>
        )}
      </AccountToolBar>

      {page === 'account' ? (
        <AccountCardBox>
          <TokenCard type={TOKEN_TYPE.USDT} />
          <TokenCard type={TOKEN_TYPE.USDC} />
          <TokenCard type={TOKEN_TYPE.stMatic} />
          <TokenCard type={TOKEN_TYPE.ezUSD} />
          <TokenCard type={TOKEN_TYPE.ezMatic} />
        </AccountCardBox>
      ) : (
        <AccountDetail />
      )}
    </PurchaseContainer>
  );
}
