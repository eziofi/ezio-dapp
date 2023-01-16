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

// export default function Purchase() {
//   const { t } = useTranslation();
//   const [tab, setTab] = useState(0);
//   const [tipDrawerOpened, setTipDrawerOpened] = useState(false);

//   return (
//     <div className={styles.purchaseTab}>
//       <TokenTabs tab={tab} tabChange={tab => setTab(tab)} />
//       <TransactionForm
//         transactionType={TRANSFER_TYPE.PURCHASE}
//         tokenType={tab === 0 ? TOKEN_TYPE.EZAT : TOKEN_TYPE.EZBT}
//         setTipDrawerOpened={setTipDrawerOpened}
//       />
//       <PurchaseDrawer opened={tipDrawerOpened} close={() => setTipDrawerOpened(false)} />
//     </div>
//   );
// }

import React from 'react';
import { CardContent, IconButton, Typography } from '@mui/material';
import {
  ContentBottom,
  ContentTop,
  ConverBtn,
  PurchaseContainer,
  DateNow,
  BuyBtn,
  ViewRule,
  FooterContent,
} from './PurchaseStyle';
import CachedIcon from '@mui/icons-material/Cached';
import { MyCardContentOne, MyCardContentSecond } from '../components/CardContent';

export default function Purchase() {
  const [type, setType] = useState(TRANSFER_TYPE.PURCHASE); // 初始化是购买
  const [tipDrawerOpened, setTipDrawerOpened] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [isBuy, setIsBuy] = useState(false);
  const { t } = useTranslation();
  const style = {
    display: 'flex',
    width: '95%',
    color: 'white',
    margin: '10px 0',
    fontWeight: 'none',
  };
  function getInputVal1(value: string) {
    setInputValue1(value);
  }
  function getInputVal2(value: string) {
    setInputValue2(value);
  }

  return (
    <PurchaseContainer>
      <Typography sx={{ margin: '22px 0 22px 10px', alignSelf: 'flex-start' }}>
        {t('purchase.purchaseValue')}
      </Typography>
      {/* 卡片1 */}
      <ContentBottom>
        <CardContent>
          <MyCardContentOne
            transactionType={type}
            // tokenType={tab === 0 ? TOKEN_TYPE.EZAT : TOKEN_TYPE.EZBT}
            getInputVal1={getInputVal1}
          />
        </CardContent>
      </ContentBottom>
      {/* cover btn */}
      <ConverBtn>
        <IconButton
          size="large"
          sx={{ color: 'white' }}
          onClick={() => {
            setType(type === TRANSFER_TYPE.PURCHASE ? TRANSFER_TYPE.REDEEM : TRANSFER_TYPE.PURCHASE);
          }}
        >
          <CachedIcon fontSize="inherit" />
        </IconButton>
      </ConverBtn>
      {/* 卡片2 */}
      <ContentTop>
        <CardContent>
          <MyCardContentSecond
            transactionType={type}
            // tokenType={tab === 0 ? TOKEN_TYPE.EZBT : TOKEN_TYPE.EZAT}
            getInputVal2={getInputVal2}
          />
        </CardContent>
      </ContentTop>
      {/* 当前时间 */}
      <DateNow>
        {t('purchase.currentTime')}: {timestampFormat(new Date().getTime())}
      </DateNow>
      {/* 购买按钮 */}
      <Button
        sx={{
          ...style,
          background:
            !inputValue1 || !parseInt(inputValue1)
              ? 'gray'
              : 'linear-gradient(180deg, rgba(108, 75, 246, 1) 0%, rgba(113, 79, 251, 1) 100%)',
        }}
        variant="contained"
        disableElevation
        disabled={!inputValue1 || !parseInt(inputValue1)}
        onClick={() => {}}
      >
        {type === TRANSFER_TYPE.PURCHASE ? t('purchase.purchaseAction') : t('redeem.redeemAction')}
      </Button>
      <ViewRule>
        <Link href="#" underline="none" onClick={() => setTipDrawerOpened(true)}>
          {t('purchase.checkTips')}
        </Link>
        {tipDrawerOpened ? <PurchaseDrawer opened={tipDrawerOpened} close={() => setTipDrawerOpened(false)} /> : <></>}
      </ViewRule>
      <FooterContent>
        <span>{t('purchase.unitPrice')} $0</span>
        <span>{t('purchase.EZATRate')} 0%..</span>
      </FooterContent>
    </PurchaseContainer>
  );
}
