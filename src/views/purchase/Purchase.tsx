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
import React, { useState } from 'react';
import './animation.less';
import { Button, CardContent, IconButton, Link, Snackbar, Toolbar, Typography, useTheme } from '@mui/material';
import PurchaseDrawer from './components/PurchaseDrawer';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { purchase, redeem, treasuryInterestRate } from '../wallet/helpers/contract_call';
import { Signer } from 'ethers';
import { TOKEN_BALANCE_TYPE, TOKEN_TYPE, TRANSFER_TYPE } from '../wallet/helpers/constant';
import useWallet from '../hooks/useWallet';
import { formatNetWorth, formatNum, timestampFormat } from '../wallet/helpers/utilities';
import { useTranslation } from 'react-i18next';
import { ContentBottom, ContentTop, ConverBtn, DateNow, FooterContent, PurchaseContainer } from './PurchaseStyle';
import CachedIcon from '@mui/icons-material/Cached';
import { MyCardContentOne, MyCardContentSecond } from '../components/CardContent';
import { useNetWorth } from '../../hooks/useNetWorth';
import { useBalance } from '../../hooks/useBalance';
import FormDialog from './components/FormDialog';
import BaseIconFont from '../components/BaseIconFont';
import { Provider } from '@ethersproject/providers';

interface IPurchaseArg {
  fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC;
  toType: TOKEN_TYPE.EZAT | TOKEN_TYPE.EZBT;
  amount: number;
  slippage: number;
  signerOrProvider: Signer | Provider;
}

interface IRedeemArg {
  fromType: TOKEN_TYPE.EZAT | TOKEN_TYPE.EZBT;
  amount: number;
  slippage: number;
  signerOrProvider: Signer | Provider;
}

export default function Purchase() {
  const queryClient: QueryClient = useQueryClient();
  const [type, setType] = useState(TRANSFER_TYPE.PURCHASE); // 0是购买 1是赎回
  const [tipDrawerOpened, setTipDrawerOpened] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [tokenType, setTokenType] = useState<TOKEN_BALANCE_TYPE>(TOKEN_BALANCE_TYPE.EZAT); // 下拉框value
  const [redeemTokenType, setredeemTokenType] = useState<TOKEN_BALANCE_TYPE>(TOKEN_BALANCE_TYPE.USDT); // 下拉框value
  const theme = useTheme();
  const [slippage, setSlippage] = useState<number>(0);
  const [time, setTime] = useState<string>();
  // 定时时间
  setInterval(() => setTime(timestampFormat(new Date().getTime())), 1000);

  const { netWorth } = useNetWorth(TOKEN_BALANCE_TYPE[tokenType as keyof typeof TOKEN_BALANCE_TYPE]);

  const { t } = useTranslation();
  const style = {
    display: 'flex',
    width: '90%',
    color: 'white',
    margin: '10px 0',
    fontWeight: 'none',
  };
  function getInputVal1(value: string) {
    setInputValue1(value);
    setInputValue2(
      value
        ? type === TRANSFER_TYPE.PURCHASE
          ? '' + (parseInt(value) / parseFloat(formatNetWorth(netWorth, true))).toFixed(2)
          : '' + (parseInt(value) * parseFloat(formatNetWorth(netWorth, true))).toFixed(2)
        : '0',
    );
  }

  function getInputVal2(value: string) {
    setInputValue2(value);
  }

  function setAnimation() {
    setInputValue1('');
    setInputValue2('');
    setType(type === TRANSFER_TYPE.PURCHASE ? TRANSFER_TYPE.REDEEM : TRANSFER_TYPE.PURCHASE);
    // setIsClick(true);
    // const contentBottom: any = document.querySelector('.contentBottom');
    // contentBottom.style.animation = 'move_down 1.5s ease-out alternate';
    // const contentTop: any = document.querySelector('.contentTop');
    // contentTop.style.animation = 'move_up 1.5s ease-out alternate';
    // setTimeout(() => {
    //   setIsClick(false);
    //   contentBottom.style.animation = 'none';
    //   contentTop.style.animation = 'none';
    // }, 1500);
  }

  function getTokenType(tokenType: TOKEN_BALANCE_TYPE) {
    setTokenType(tokenType);
  }

  const [msgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const { mutate: purchaseMutate } = useMutation(
    (arg: IPurchaseArg) => purchase(arg.fromType, arg.toType, arg.amount, arg.slippage, arg.signerOrProvider),
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
    (arg: IRedeemArg) => redeem(arg.fromType, arg.amount, arg.signerOrProvider, arg.slippage),
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
      ? redeemTokenType
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
    console.log({
      fromType: TOKEN_TYPE[redeemTokenType as keyof typeof TOKEN_TYPE] as TOKEN_TYPE.USDT | TOKEN_TYPE.USDC,
      toType: TOKEN_TYPE[tokenType as keyof typeof TOKEN_TYPE] as TOKEN_TYPE.EZAT | TOKEN_TYPE.EZBT,
      amount: Number(inputValue1),
      slippage,
    });
    refetchBalance().then(({ data }) => {
      const balance = formatNum(data, redeemTokenType).toUnsafeFloat();
      if (parseInt(inputValue1) > balance) {
        setMsg(t('purchase.moreThanBalanceMsg'));
        setMsgOpen(true);
      } else {
        const args: IPurchaseArg = {
          fromType: TOKEN_TYPE[redeemTokenType as keyof typeof TOKEN_TYPE] as TOKEN_TYPE.USDT | TOKEN_TYPE.USDC,
          toType: TOKEN_TYPE[tokenType as keyof typeof TOKEN_TYPE] as TOKEN_TYPE.EZAT | TOKEN_TYPE.EZBT,
          amount: Number(inputValue1),
          slippage,
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
        const args: IRedeemArg = {
          fromType: TOKEN_TYPE[tokenType as keyof typeof TOKEN_TYPE] as TOKEN_TYPE.EZAT | TOKEN_TYPE.EZBT,
          amount: Number(inputValue1),
          signerOrProvider: ethersProvider!.getSigner(),
          slippage,
        };
        redeemMutate(args);
        setInputValue1('');
        setInputValue2('');
      }
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);

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
        <Typography
          variant="h6"
          component="div"
          sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
          <span>{type === 0 ? t('purchase.purchaseValue') : t('redeem.redeemValue')}</span>
          {/* <span onClick={handleClickOpen}>设置</span> */}
          <IconButton onClick={handleClickOpen}>
            {/* <img src={rollbackIcon} width="24" style={{ background: 'red' }} /> */}
            {/* <ReplyIcon /> */}
            <BaseIconFont name="icon-shezhi" style={{ width: 20, height: 20 }} />
          </IconButton>
          <FormDialog open={open} setOpen={setOpen} slippage={slippage} setSlippage={setSlippage} />
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
              isBuy={type === TRANSFER_TYPE.PURCHASE}
              transactionType={type}
              tokenType={tokenType}
              getTokenType={getTokenType}
              getInputVal1={getInputVal1}
              redeemTokenType={redeemTokenType}
              setredeemTokenType={setredeemTokenType}
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
              tokenType={tokenType}
              getTokenType={getTokenType}
              inputValue2={inputValue2}
              redeemTokenType={redeemTokenType}
              setredeemTokenType={setredeemTokenType}
            />
          </CardContent>
        ) : (
          <></>
        )}
      </ContentTop>
      {/* 当前时间 */}
      <DateNow>
        {t('purchase.currentTime')}: {time}
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
        {/*<span>{t('purchase.unitPrice') + ' $' + formatNetWorth(netWorth, true)}</span>*/}
        <span style={{ color: theme.palette.text.secondary }}>
          {t('purchase.EZATRate')} {(rate ? (parseFloat(formatNetWorth(rate)) / 10000).toFixed(2) : 0) + ' ‱'}
        </span>
      </FooterContent>
    </PurchaseContainer>
  );
}
