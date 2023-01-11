import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import rollbackIcon from '../../assets/account/rollback@2x.png';
import { IconButton } from '@mui/material';
import AccountDetail from './AccountDetail';
import styles from './account.module.less';
import useWallet from '../hooks/useWallet';
import { TOKEN_BALANCE_TYPE, TOKEN_TYPE } from '../wallet/helpers/constant';
import { formatNum, toNum } from '../wallet/helpers/utilities';
import { useTranslation } from 'react-i18next';
import { useBalance } from '../../hooks/useBalance';
import { useNetWorth } from '../../hooks/useNetWorth';

export default function Account() {
  const [page, setPage] = useState('account');
  const { account, ethersProvider } = useWallet();
  const { t } = useTranslation();
  // const { data: purchaseInvitation } = useQuery(
  //   ['getPurchaseInvitation'],
  //   () => getPurchaseInvitation(ethersProvider!.getSigner()),
  //   {
  //     enabled: !!ethersProvider,
  //   },
  // );

  // 提取ezio
  // const extractEzio = async () => {
  //   // 可提取 ezio
  //   if (purchaseInvitation && purchaseInvitation[4]) {
  //     await extractToken(ethersProvider!.getSigner(), 1);
  //   }
  // };

  const TokenCard = ({ type }: { type: keyof typeof TOKEN_BALANCE_TYPE }) => {
    const { balance } = useBalance(type);
    const { netWorth } = useNetWorth(type === TOKEN_BALANCE_TYPE.EZAT ? TOKEN_TYPE.EZAT : TOKEN_TYPE.EZBT);

    return (
      <div className={styles.tokenCard}>
        {type === TOKEN_BALANCE_TYPE.USDT ? (
          <>
            <div className={styles.tokenText}>{type}</div>
            <div className={styles.tokenAmount}>{toNum(balance)}</div>
            <div className={styles.tokenValue}>
              {t('account.netWorth')}: ${formatNum(balance).toUnsafeFloat().toFixed(2)}
            </div>
          </>
        ) : (
          <>
            <div className={styles.tokenText}>{type}</div>
            <div className={styles.tokenAmount}>{toNum(balance)}</div>
            <div className={styles.tokenValue}>
              {t('account.netWorth')}: ${formatNum(balance).mulUnsafe(formatNum(netWorth)).toUnsafeFloat().toFixed(2)}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {page === 'account' ? t('account.balance') : t('account.detail')}
          </Typography>
          {page === 'account' ? (
            <Button color="inherit" onClick={() => setPage('detail')}>
              {t('account.checkDetail')}
            </Button>
          ) : (
            <IconButton size="large" edge="start" color="inherit" onClick={() => setPage('account')}>
              <img src={rollbackIcon} width="24" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {page === 'account' ? (
        <>
          <div className={styles.accountBox}>
            <div className={styles.tokenCardBox}>
              <TokenCard type="USDT" />
              <TokenCard type="EZAT" />
              <TokenCard type="EZBT" />
            </div>
          </div>
          {/*<div style={{ paddingLeft: '14px', paddingRight: '14px', width: '100%' }}>*/}
          {/*  <Button*/}
          {/*    variant="contained"*/}
          {/*    disableElevation*/}
          {/*    sx={{ width: '100%', marginTop: '20px' }}*/}
          {/*    onClick={extractEzio}*/}
          {/*    disabled={!(purchaseInvitation && purchaseInvitation[4])}*/}
          {/*  >*/}
          {/*    {t('account.extractAction')}*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </>
      ) : (
        <AccountDetail />
      )}
    </Box>
  );
}
