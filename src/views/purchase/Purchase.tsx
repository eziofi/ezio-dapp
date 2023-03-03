import React, { useContext, useEffect, useState } from 'react';
import './animation.less';
import {
  Backdrop,
  Button,
  CardContent,
  CircularProgress,
  IconButton,
  Link,
  Snackbar,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import PurchaseDrawer from './components/PurchaseDrawer';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { interestRateDay, purchase, redeem } from '../wallet/helpers/functions';
import { BigNumber, Signer } from 'ethers';
import { TOKEN_DECIMAL, TOKEN_TYPE, TRANSFER_TYPE } from '../wallet/helpers/constant';
import useWallet from '../hooks/useWallet';
import { formatDecimal, formatNetWorth, timestampFormat } from '../wallet/helpers/utilities';
import { useTranslation } from 'react-i18next';
import { ContentBottom, ContentTop, ConverBtn, DateNow, FooterContent, PurchaseContainer } from './PurchaseStyle';
import CachedIcon from '@mui/icons-material/Cached';
import { MyCardContentOne, MyCardContentSecond } from '../components/CardContent';
import { usePrice } from '../../hooks/usePrice';
import { useBalance } from '../../hooks/useBalance';
import FormDialog from './components/FormDialog';
import BaseIconFont from '../components/BaseIconFont';
import { Provider } from '@ethersproject/providers';
import { treasuryInterestRate } from '../wallet/helpers/contract_call';
import { UIContext } from '../../layouts/dashboard/DashboardLayout';

interface IPurchaseArg {
  fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC;
  toType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic;
  amount: number;
  slippage: number;
  signerOrProvider: Signer | Provider;
}

interface IRedeemArg {
  fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic;
  toType: TOKEN_TYPE.USDC | TOKEN_TYPE.stMatic;
  amount: number;
  slippage: number;
  signerOrProvider: Signer | Provider;
}

export default function Purchase() {
  const queryClient: QueryClient = useQueryClient();
  const [type, setType] = useState(TRANSFER_TYPE.PURCHASE); // 0是购买 1是赎回
  // const [tipDrawerOpened, setTipDrawerOpened] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [tokenType, setTokenType] = useState<TOKEN_TYPE>(TOKEN_TYPE.ezUSD); // 下拉框value
  const [redeemTokenType, setRedeemTokenType] = useState<TOKEN_TYPE>(TOKEN_TYPE.USDT); // 下拉框value
  const theme = useTheme();
  const [slippage, setSlippage] = useState<number>(1);
  const [time, setTime] = useState<string>();

  const { openBackLoading, closeBackLoading, setBackLoadingText } = useContext(UIContext);

  useEffect(() => {
    // 定时时间
    const timer = setInterval(() => setTime(timestampFormat(new Date().getTime())), 1000);
    9;
    return () => clearInterval(timer);
  }, []);

  const { price: fromPrice } = usePrice(type === TRANSFER_TYPE.PURCHASE ? redeemTokenType : tokenType);
  const { price: toPrice } = usePrice(type === TRANSFER_TYPE.PURCHASE ? tokenType : redeemTokenType);

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
    // 计算预计获得
    console.log('fromPrice=' + fromPrice);
    console.log('toPrice=' + toPrice);
    if (fromPrice && toPrice) {
      const estimatedValue2 = (parseFloat(value) * parseFloat(fromPrice)) / parseFloat(toPrice);
      setInputValue2(estimatedValue2 + '');
    }
  }

  // function getInputVal2(value: string) {
  //   setInputValue2(value);
  // }

  function setAnimation() {
    setInputValue1('');
    setInputValue2('');
    setType(type === TRANSFER_TYPE.PURCHASE ? TRANSFER_TYPE.REDEEM : TRANSFER_TYPE.PURCHASE); // 改变购买 / 赎回 状态

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

  function getTokenType(tokenType: TOKEN_TYPE) {
    setTokenType(tokenType);
  }

  const [msgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const { mutateAsync: purchaseMutate } = useMutation(
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

  const { mutateAsync: redeemMutate } = useMutation(
    (arg: IRedeemArg) => redeem(arg.fromType, arg.toType, arg.amount, arg.signerOrProvider, arg.slippage),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: error => {
        console.error(error);
      },
    },
  );

  const { balance, refetchBalance } = useBalance(type === TRANSFER_TYPE.PURCHASE ? redeemTokenType : tokenType);

  const { ethersProvider, account } = useWallet();
  const { data: rate } = useQuery(['ezUSDDayRate'], () => interestRateDay(ethersProvider!.getSigner()), {
    enabled: !!ethersProvider,
    // onSuccess: data => {
    //   const res = formatNetWorth(data);
    //   debugger;
    // },
  });

  // 购买
  const doPurchase = () => {
    openBackLoading();
    setBackLoadingText(t('purchase.purchaseTip'));
    refetchBalance()
      .then(({ data }) => {
        if (!data) return Promise.reject();
        const balance = formatDecimal(data, redeemTokenType, TOKEN_DECIMAL[redeemTokenType]).toUnsafeFloat();
        if (parseFloat(inputValue1) > balance) {
          setMsg(t('purchase.moreThanBalanceMsg'));
          setMsgOpen(true);
        } else {
          const args: IPurchaseArg = {
            fromType: redeemTokenType as TOKEN_TYPE.USDC | TOKEN_TYPE.USDT,
            toType: tokenType as TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
            amount: Number(inputValue1),
            slippage,
            signerOrProvider: ethersProvider!.getSigner(),
          };

          return purchaseMutate(args);
        }
      })
      .then(() => {})
      .finally(() => {
        onTransferOver();
      });
  };

  const doRedeem = () => {
    openBackLoading();
    setBackLoadingText(t('purchase.purchaseTip'));
    refetchBalance()
      .then(({ data }) => {
        if (!data) return Promise.reject();
        const balance = formatDecimal(data, tokenType, TOKEN_DECIMAL[tokenType]).toUnsafeFloat();
        if (parseFloat(inputValue1) > balance) {
          setMsg(t('redeem.moreThanBalanceMsg'));
          setMsgOpen(true);
        } else {
          const args: IRedeemArg = {
            fromType: tokenType as TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
            toType: redeemTokenType as TOKEN_TYPE.USDC | TOKEN_TYPE.stMatic,
            amount: Number(inputValue1),
            signerOrProvider: ethersProvider!.getSigner(),
            slippage,
          };
          return redeemMutate(args);
        }
      })
      .finally(() => {
        onTransferOver();
      });
  };

  const onTransferOver = () => {
    setInputValue1('');
    setInputValue2('');
    closeBackLoading();
    setBackLoadingText('');
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);

  useEffect(() => {
    // type 为赎回时 && redeemTokenType = USDT, redeemTokenType赋值 为 USDC 因为赎回时的下拉框value不存在USDT 会导致value为空
    if (type === TRANSFER_TYPE.REDEEM && redeemTokenType === 4) {
      setRedeemTokenType(TOKEN_TYPE.USDC);
    } else if (type === TRANSFER_TYPE.PURCHASE && redeemTokenType === 3) {
      // type 为购买时 && redeemTokenType = stMatic, redeemTokenType赋值 为 USDT 因为购买时的下拉框value不存stMatic 会导致value为空
      setRedeemTokenType(TOKEN_TYPE.USDT);
    }
  }, [type]);

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
              setRedeemTokenType={setRedeemTokenType}
              inputValue1={inputValue1}
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
              isBuy={type === TRANSFER_TYPE.PURCHASE}
              transactionType={type}
              tokenType={tokenType}
              getTokenType={getTokenType}
              inputValue2={inputValue2}
              redeemTokenType={redeemTokenType}
              setRedeemTokenType={setRedeemTokenType}
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
            !inputValue1 || !+inputValue1
              ? 'gray'
              : 'linear-gradient(180deg, rgba(108, 75, 246, 1) 0%, rgba(113, 79, 251, 1) 100%)',
        }}
        variant="contained"
        disableElevation
        disabled={!inputValue1 || !+inputValue1}
        onClick={() => (type === 0 ? doPurchase() : type === 1 ? doRedeem() : null)}
      >
        {type === TRANSFER_TYPE.PURCHASE ? t('purchase.purchaseAction') : t('redeem.redeemAction')}
      </Button>
      {/*<>*/}
      {/*  <Link*/}
      {/*    href="#"*/}
      {/*    underline="none"*/}
      {/*    onClick={() => setTipDrawerOpened(true)}*/}
      {/*    sx={{ fontSize: 12, color: 'rgba(110, 76, 248, 1)' }}*/}
      {/*  >*/}
      {/*    {t('purchase.checkTips')}*/}
      {/*  </Link>*/}
      {/*  {tipDrawerOpened ? <PurchaseDrawer opened={tipDrawerOpened} close={() => setTipDrawerOpened(false)} /> : <></>}*/}
      {/*</>*/}
      <FooterContent>
        {/*<span>{t('purchase.unitPrice') + ' $' + formatNetWorth(netWorth, true)}</span>*/}
        <span style={{ color: theme.palette.text.secondary }}>
          {t('purchase.EZATRate')} {rate}
        </span>
      </FooterContent>
    </PurchaseContainer>
  );
}
