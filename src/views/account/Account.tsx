import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import rollbackIcon from '../../assets/account/rollback@2x.png';
import { Card, CardContent, IconButton, Tooltip } from '@mui/material';
import AccountDetail from './AccountDetail';
import styles from './account.module.less';
import useWallet from '../hooks/useWallet';
import { TOKEN_TYPE } from '../wallet/helpers/constant';
import { formatNum, toNum } from '../wallet/helpers/utilities';
import { useTranslation } from 'react-i18next';
import { useBalance } from '../../hooks/useBalance';
import { useNetWorth } from '../../hooks/useNetWorth';
import { PurchaseContainer } from '../purchase/PurchaseStyle';
import { AccountCard, AccountCardBox, AccountToolBar, Content } from './AccountStyle';
import UndoIcon from '@mui/icons-material/Undo';
import ReplyIcon from '@mui/icons-material/Reply';
import BaseIconFont from '../components/BaseIconFont';

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

  const TokenCard = ({ type }: { type: TOKEN_TYPE }) => {
    const { balance } = useBalance(type);

    const iconDiv = {
      width: 50,
      height: 50,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    };

    const IconStyle = {
      width: 30,
      height: 30,
      borderRadius: '50%',
      opacity: 1,
      fill: 'white',
    };

    return (
      <AccountCard>
        <Content>
          {type === TOKEN_TYPE.USDT || type === TOKEN_TYPE.USDC ? (
            <>
              {/* icon */}
              {/* <Box sx={{ width: 50, height: 50, borderRadius: '50%', background: 'pink', marginRight: 2 }} /> */}
              <div
                style={{
                  ...iconDiv,
                  background: type === TOKEN_TYPE.USDT ? 'rgba(50, 177, 108)' : 'rgba(60, 193, 200)',
                }}
              >
                <BaseIconFont
                  name={type === TOKEN_TYPE.USDT ? 'icon-USDT-white' : 'icon-USDC-white'}
                  style={{ ...IconStyle }}
                />
              </div>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <div style={{ fontSize: 20 }}>{TOKEN_TYPE[type]}</div>
                  <div style={{ fontSize: 12, color: 'rgba(76, 80, 97, 1)' }}>
                    {t('account.netWorth')}: ${formatNum(balance, type).toUnsafeFloat().toFixed(2)}
                  </div>
                </Box>
                <div>
                  <div style={{ fontSize: 28, color: 'rgba(67, 207, 124, 1)' }}>
                    {formatNum(balance, type).toUnsafeFloat().toFixed(2)}
                  </div>
                </div>
              </Box>
            </>
          ) : (
            <>
              {/* icon */}
              {/* <Box sx={{ width: 50, height: 50, borderRadius: '50%', background: 'pink', marginRight: 2 }} /> */}
              <div
                style={{
                  ...iconDiv,
                  background: type === TOKEN_TYPE.EZAT ? 'rgba(95, 69, 186, 1)' : 'rgba(26, 107, 173, 1)',
                }}
              >
                <BaseIconFont
                  name={type === TOKEN_TYPE.EZAT ? 'icon-A' : 'icon-B'}
                  style={{
                    ...IconStyle,
                  }}
                />
              </div>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <div style={{ fontSize: 20 }}>{TOKEN_TYPE[type]}</div>
                  <div style={{ fontSize: 12, color: 'rgba(76, 80, 97, 1)' }}>
                    {t('account.netWorth')}: ${formatNum(balance).toUnsafeFloat().toFixed(2)}
                  </div>
                </Box>
                <div>
                  <div style={{ fontSize: 28, color: 'rgba(67, 207, 124, 1)' }}>{toNum(balance)}</div>
                </div>
              </Box>
            </>
          )}
        </Content>
      </AccountCard>
    );
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //         {page === 'account' ? t('account.balance') : t('account.detail')}
    //       </Typography>
    //       {page === 'account' ? (
    //         <Button color="inherit" onClick={() => setPage('detail')}>
    //           {t('account.checkDetail')}
    //         </Button>
    //       ) : (
    //         <IconButton size="large" edge="start" color="inherit" onClick={() => setPage('account')}>
    //           <img src={rollbackIcon} width="24" />
    //         </IconButton>
    //       )}
    //     </Toolbar>
    //   </AppBar>
    //   {page === 'account' ? (
    //     <>
    //       <div className={styles.accountBox}>
    //         <div className={styles.tokenCardBox}>
    //           <TokenCard type="USDT" />
    //           <TokenCard type="EZAT" />
    //           <TokenCard type="EZBT" />
    //         </div>
    //       </div>
    //       {/*<div style={{ paddingLeft: '14px', paddingRight: '14px', width: '100%' }}>*/}
    //       {/*  <Button*/}
    //       {/*    variant="contained"*/}
    //       {/*    disableElevation*/}
    //       {/*    sx={{ width: '100%', marginTop: '20px' }}*/}
    //       {/*    onClick={extractEzio}*/}
    //       {/*    disabled={!(purchaseInvitation && purchaseInvitation[4])}*/}
    //       {/*  >*/}
    //       {/*    {t('account.extractAction')}*/}
    //       {/*  </Button>*/}
    //       {/*</div>*/}
    //     </>
    //   ) : (
    //     <AccountDetail />
    //   )}
    // </Box>
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
          <TokenCard type={TOKEN_TYPE.EZAT} />
          <TokenCard type={TOKEN_TYPE.EZBT} />
        </AccountCardBox>
      ) : (
        <AccountDetail />
      )}
    </PurchaseContainer>
  );
}
