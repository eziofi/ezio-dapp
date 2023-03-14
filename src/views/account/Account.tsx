import { useState } from 'react';
import { Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import AccountDetail from './AccountDetail';
import { TOKEN_TYPE } from '../wallet/helpers/constant';
import { useTranslation } from 'react-i18next';
import { PurchaseContainer } from '../purchase/PurchaseStyle';
import { AccountCardBox, AccountToolBar, Content } from './AccountStyle';
import BaseIconFont from '../components/BaseIconFont';
import AccountTokenCard from '../components/AccountTokenCard';
import CachedIcon from '@mui/icons-material/Cached';
import { useQueryClient } from 'react-query';

export default function Account() {
  const [page, setPage] = useState('account');
  const { t } = useTranslation();
  const [refreshFlag, setRefreshFlag] = useState(0);
  const queryClient = useQueryClient();

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
          // <Tooltip title={t('account.detail')} placement="top">
          //   <IconButton onClick={() => setPage('detail')}>
          //     <BaseIconFont name="icon-jiaofeizhangdan_active" style={{ width: 20, height: 20 }} />
          //   </IconButton>
          // </Tooltip>
          <IconButton
            aria-label="refresh"
            onClick={() => {
              setRefreshFlag(refreshFlag + 1);
              // queryClient.invalidateQueries(['balanceOf', TOKEN_TYPE.USDC]);
              // queryClient.invalidateQueries(['balanceOf', TOKEN_TYPE.USDT]);
              // queryClient.invalidateQueries(['balanceOf', TOKEN_TYPE.stMatic]);
            }}
          >
            <CachedIcon />
          </IconButton>
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
          <AccountTokenCard type={TOKEN_TYPE.USDT} refreshFlag={refreshFlag} />
          <AccountTokenCard type={TOKEN_TYPE.USDC} refreshFlag={refreshFlag} />
          <AccountTokenCard type={TOKEN_TYPE.stMATIC} refreshFlag={refreshFlag} />
          <AccountTokenCard type={TOKEN_TYPE.ezUSD} refreshFlag={refreshFlag} />
          <AccountTokenCard type={TOKEN_TYPE.ezMATIC} refreshFlag={refreshFlag} />
        </AccountCardBox>
      ) : (
        <AccountDetail />
      )}
    </PurchaseContainer>
  );
}
