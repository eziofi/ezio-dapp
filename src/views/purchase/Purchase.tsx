import TokenTabs from './components/TokenTabs';
import { Dispatch, ReactElement, SetStateAction, useState, useTransition } from 'react';
import './animation.less';
import TextField from '@mui/material/TextField';
import { Button, Link, Snackbar, Toolbar } from '@mui/material';
import PurchaseRecordTable from './components/PurchaseRecordTable';
import PurchaseDrawer from './components/PurchaseDrawer';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ezatNetWorth,
  ezbtNetWorth,
  purchase,
  redeem,
  treasuryInterestRate,
  usdtBalanceOf,
} from '../wallet/helpers/contract_call';
import { Signer } from 'ethers';
import { TOKEN_BALANCE_TYPE, TOKEN_TYPE, TRANSFER_TYPE } from '../wallet/helpers/constant';
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
import { ContentBottom, ContentTop, ConverBtn, PurchaseContainer, DateNow, FooterContent } from './PurchaseStyle';
import CachedIcon from '@mui/icons-material/Cached';
import { MyCardContentOne, MyCardContentSecond } from '../components/CardContent';
import { useNetWorth } from '../../hooks/useNetWorth';
import { useBalance } from '../../hooks/useBalance';

interface IPurchaseArg {
  type: TOKEN_TYPE;
  tokenQty: number;
  signerOrProvider: Signer;
}

export default function Purchase() {
  const queryClient: QueryClient = useQueryClient();
  const [type, setType] = useState(TRANSFER_TYPE.PURCHASE); // 0是购买 1是赎回
  const [tipDrawerOpened, setTipDrawerOpened] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [tokenType, setTokenType] = useState<TOKEN_BALANCE_TYPE>(TOKEN_BALANCE_TYPE.EZAT); // 下拉框value
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

  function setAnimation() {
    setIsClick(true);
    setType(type === TRANSFER_TYPE.PURCHASE ? TRANSFER_TYPE.REDEEM : TRANSFER_TYPE.PURCHASE);
    const contentBottom: any = document.querySelector('.contentBottom');
    contentBottom.style.animation = 'move_down 1.5s ease-out alternate';
    const contentTop: any = document.querySelector('.contentTop');
    contentTop.style.animation = 'move_up 1.5s ease-out alternate';
    setTimeout(() => {
      setIsClick(false);
      contentBottom.style.animation = 'none';
      contentTop.style.animation = 'none';
    }, 1500);
  }

  function getTokenType(tokenType: TOKEN_BALANCE_TYPE) {
    setTokenType(tokenType);
  }

  // const { netWorth } = useNetWorth(type);

  const [msgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const { mutate: purchaseMutate } = useMutation(
    (arg: IPurchaseArg) => purchase(arg.type, arg.tokenQty, arg.signerOrProvider),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: error => {
        console.error(error);
      },
    },
  );

  const { mutate: redeemMutate } = useMutation(
    (arg: IPurchaseArg) => redeem(arg.type, arg.tokenQty, arg.signerOrProvider),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: error => {
        console.error(error);
      },
    },
  );

  const { balance, refetchBalance } = useBalance(
    type === TRANSFER_TYPE.PURCHASE
      ? TOKEN_BALANCE_TYPE.USDT
      : tokenType === 'EZAT'
      ? TOKEN_BALANCE_TYPE.EZAT
      : TOKEN_BALANCE_TYPE.EZBT,
  );

  const { ethersProvider, account } = useWallet();
  const { data: rate } = useQuery(['EZATrate'], () => treasuryInterestRate(ethersProvider!.getSigner()), {
    enabled: !!ethersProvider,
    // onSuccess: data => {
    //   const res = formatNetWorth(data);
    //   debugger;
    // },
  });

  // 购买
  const doPurchase = () => {
    refetchBalance().then(({ data }) => {
      const balance = formatNum(data).toUnsafeFloat();
      if (parseInt(inputValue1) > balance) {
        setMsg(t('purchase.moreThanBalanceMsg'));
        setMsgOpen(true);
      } else {
        const args: IPurchaseArg = {
          type: tokenType as any,
          tokenQty: parseInt(inputValue1),
          signerOrProvider: ethersProvider!.getSigner(),
        };
        purchaseMutate(args);
        setInputValue1('');
        setInputValue2('');
      }
    });
  };

  const doRedeem = () => {
    refetchBalance().then(({ data }) => {
      const balance = formatNum(data).toUnsafeFloat();
      if (parseInt(inputValue1) > balance) {
        setMsg(t('redeem.moreThanBalanceMsg'));
        setMsgOpen(true);
      } else {
        const args: IPurchaseArg = {
          type: tokenType as any,
          tokenQty: parseInt(inputValue1),
          signerOrProvider: ethersProvider!.getSigner(),
        };
        redeemMutate(args);
        setInputValue1('');
        setInputValue2('');
      }
    });
    // refetchBalance().then(data => {
    //   const balance = formatNum(data.data).toUnsafeFloat();

    //   if (parseInt(inputValue) > balance) {
    //     setMsg(t('redeem.moreThanBalanceMsg'));
    //     setMsgOpen(true);
    //   } else {
    //     const args: IPurchaseArg = {
    //       type: tokenType,
    //       tokenQty: parseInt(inputValue),
    //       signerOrProvider: ethersProvider!.getSigner(),
    //     };
    //     redeemMutate(args);
    //     setInputValue('');
    //   }
    // });
  };

  return (
    <PurchaseContainer>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={msgOpen}
        onClose={() => setMsgOpen(false)}
        message={msg}
        sx={{ position: 'fixed' }}
      />
      <Toolbar sx={{ width: '98%', alignSelf: 'flex-start', margin: '0 auto' }}>
        <Typography variant="h6" component="div">
          {type === 0 ? t('purchase.purchaseValue') : t('redeem.redeemValue')}
        </Typography>
      </Toolbar>
      {/* 卡片1 */}
      <ContentBottom
        sx={{
          borderColor: `${inputValue1 ? 'rgba(110, 76, 248, 1)' : ''}`,
          ':after': {
            border: `${inputValue1 ? '1px solid rgba(110, 76, 248, 1)' : ''}`,
          },
        }}
        className="contentBottom"
      >
        {!isClick ? (
          <CardContent>
            <MyCardContentOne
              transactionType={type}
              // tokenType={tab === 0 ? TOKEN_TYPE.EZAT : TOKEN_TYPE.EZBT}
              getTokenType={getTokenType}
              getInputVal1={getInputVal1}
            />
          </CardContent>
        ) : (
          <></>
        )}
      </ContentBottom>
      {/* cover btn */}
      <ConverBtn className="coverBtn">
        <IconButton
          className="iconBtn"
          // size="large"
          sx={{ color: 'white' }}
          onClick={() => {
            setAnimation();
          }}
        >
          <CachedIcon fontSize="inherit" />
        </IconButton>
      </ConverBtn>
      {/* 卡片2 */}
      <ContentTop
        sx={{
          borderColor: `${inputValue2 ? 'rgba(110, 76, 248, 1)' : ''}`,
          ':after': {
            border: `${inputValue2 ? '1px solid rgba(110, 76, 248, 1)' : ''}`,
          },
        }}
        className="contentTop"
      >
        {!isClick ? (
          <CardContent>
            <MyCardContentSecond
              transactionType={type}
              // tokenType={tab === 0 ? TOKEN_TYPE.EZBT : TOKEN_TYPE.EZAT}
              getTokenType={getTokenType}
              getInputVal2={getInputVal2}
            />
          </CardContent>
        ) : (
          <></>
        )}
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
        onClick={() => (type === 0 ? doPurchase() : type === 1 ? doRedeem() : null)}
      >
        {type === TRANSFER_TYPE.PURCHASE ? t('purchase.purchaseAction') : t('redeem.redeemAction')}
      </Button>
      <>
        <Link
          href="#"
          underline="none"
          onClick={() => setTipDrawerOpened(true)}
          sx={{ fontSize: 12, color: 'rgba(110, 76, 248, 1)' }}
        >
          {t('purchase.checkTips')}
        </Link>
        {tipDrawerOpened ? <PurchaseDrawer opened={tipDrawerOpened} close={() => setTipDrawerOpened(false)} /> : <></>}
      </>
      <FooterContent>
        <span>{t('purchase.unitPrice')} $0</span>
        <span>{t('purchase.EZATRate')} 0%..</span>
      </FooterContent>
    </PurchaseContainer>
  );
}
