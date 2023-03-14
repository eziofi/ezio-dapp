import React, { useContext, useEffect, useState } from 'react';
import './animation.less';
import { Box, Button, CardContent, CircularProgress, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Signer } from 'ethers';
import { TOKEN_DECIMAL, TOKEN_TYPE, TRANSFER_TYPE } from '../wallet/helpers/constant';
import useWallet from '../hooks/useWallet';
import { formatDecimal, formatString, timestampFormat } from '../wallet/helpers/utilities';
import { useTranslation } from 'react-i18next';
import {
  ContentBottom,
  ContentTop,
  ConverBtn,
  DateNow,
  FooterContent,
  PurchaseContainer,
  UnitconverContent,
} from './PurchaseStyle';
import { MyCardContentOne, MyCardContentSecond } from './components/CardContent';
import { usePrice } from '../../hooks/usePrice';
import { useBalance } from '../../hooks/useBalance';
import BaseIconFont from '../components/BaseIconFont';
import { Provider } from '@ethersproject/providers';
import { interestRateYear } from '../wallet/helpers/contract_call';
import { UIContext } from '../../layouts/dashboard/DashboardLayout';
import useTx from '../../hooks/useTx';
import { InlineSkeleton } from '../components/Skeleton';
import { useFeeRate } from '../../hooks/useFeeRate';
import SlippagePopover from './components/SlippagePopover';

interface IPurchaseArg {
  fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC;
  toType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMATIC;
  amount: number;
  slippage: number;
  signerOrProvider: Signer | Provider;
}

interface IRedeemArg {
  fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMATIC;
  toType: TOKEN_TYPE.USDC | TOKEN_TYPE.stMATIC;
  amount: number;
  slippage: number;
  signerOrProvider: Signer | Provider;
}

interface IApproveArg {
  fromType: TOKEN_TYPE.USDC | TOKEN_TYPE.USDT;
  signerOrProvider: Signer | Provider;
}

export default function Purchase() {
  const queryClient: QueryClient = useQueryClient();
  const [type, setType] = useState(TRANSFER_TYPE.PURCHASE); // 0是购买 1是赎回
  // const [tipDrawerOpened, setTipDrawerOpened] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [tokenType, setTokenType] = useState<TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMATIC>(TOKEN_TYPE.ezUSD); // 下拉框value
  const [redeemTokenType, setRedeemTokenType] = useState<TOKEN_TYPE.USDC | TOKEN_TYPE.USDT | TOKEN_TYPE.stMATIC>(
    TOKEN_TYPE.USDT,
  ); // 下拉框value
  const theme = useTheme();

  const [tokenRate, setTokenRate] = useState('1'); // eg. 1 USDT = xxx ezUSD

  const [slippage, setSlippage] = useState<number>(0.5);
  const [resetVal] = useState<number>(0.5);
  // const [time, setTime] = useState<string>();

  const { loadingOpen, loadingText } = useContext(UIContext);

  const { purchase, redeem, approve } = useTx();

  const { openBackLoading, closeBackLoading, setBackLoadingText, setMsg, openMsg, closeMsg } = useContext(UIContext);

  // useEffect(() => {
  //   // 定时时间
  //   const timer = setInterval(() => setTime(timestampFormat(new Date().getTime())), 1000);
  //   return () => clearInterval(timer);
  // }, []);

  const { price: fromPrice } = usePrice(type === TRANSFER_TYPE.PURCHASE ? redeemTokenType : tokenType);
  const { price: toPrice } = usePrice(type === TRANSFER_TYPE.PURCHASE ? tokenType : redeemTokenType);
  const { feeRate } = useFeeRate();

  useEffect(() => {
    if (fromPrice && toPrice && inputValue1) {
      const rate = formatString('' + parseFloat(fromPrice) / parseFloat(toPrice), 6).toString();
      setTokenRate(rate);
    }
  }, [tokenType, redeemTokenType, fromPrice, toPrice, inputValue1]);

  const { t } = useTranslation();

  function getInputVal1(value: string) {
    setInputValue1(value);
    // 计算预计获得
    if (fromPrice && toPrice) {
      const estimatedValue2 = (parseFloat(value) * parseFloat(fromPrice)) / parseFloat(toPrice);
      setInputValue2(estimatedValue2 + '');
    }
  }

  // 改变购买 / 赎回 状态 清空value
  function setAnimation() {
    setInputValue1('');
    setInputValue2('');
    setType(type === TRANSFER_TYPE.PURCHASE ? TRANSFER_TYPE.REDEEM : TRANSFER_TYPE.PURCHASE);
  }

  function getTokenType(tokenType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMATIC) {
    setTokenType(tokenType);
  }

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

  const { mutateAsync: approveMutate } = useMutation(
    (arg: IApproveArg) => approve(arg.fromType, arg.signerOrProvider),
    {
      onError: error => {
        console.error(error);
      },
    },
  );

  const doApprove = async () => {
    try {
      openBackLoading();
      const args: IApproveArg = {
        fromType: redeemTokenType as TOKEN_TYPE.USDC | TOKEN_TYPE.USDT,
        signerOrProvider: ethersProvider!.getSigner(),
      };
      await approveMutate(args);
      await queryClient.invalidateQueries('allowance');
      console.log('resetApproveState');
      resetApproveState();
    } catch (e) {
      console.error(e);
    } finally {
      closeBackLoading();
      setBackLoadingText('');
    }
  };

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

  const { ethersProvider, account, allowanceUSDT, allowanceUSDC } = useWallet();

  const [needApprove, setNeedApprove] = useState(false);

  const resetApproveState = () => {
    setNeedApprove(
      type === TRANSFER_TYPE.PURCHASE &&
        ((redeemTokenType === TOKEN_TYPE.USDT && (!allowanceUSDT || allowanceUSDT === '0')) ||
          (redeemTokenType === TOKEN_TYPE.USDC && (!allowanceUSDC || allowanceUSDC === '0'))),
    );
    // setNeedApprove(true);
  };

  useEffect(() => {
    if (allowanceUSDT && allowanceUSDC) {
      resetApproveState();
    }
  }, [redeemTokenType, type, allowanceUSDT, allowanceUSDC]);

  const { data: rate } = useQuery(['ezUSDDayRate'], () => interestRateYear(ethersProvider!.getSigner()), {
    enabled: !!ethersProvider,
    // onSuccess: data => {
    //   const res = formatNetWorth(data);
    //   debugger;
    // },
  });

  function handleError(error: any) {
    if (error.reason) {
      openMsg(error.reason);
    } else if (error.code) {
      openMsg(error.code);
    } else {
      openMsg('Error');
    }
  }

  // 购买
  const doPurchase = () => {
    openBackLoading();
    refetchBalance()
      .then(({ data }) => {
        if (!data) return Promise.reject();
        const balance = parseFloat(data);
        if (parseFloat(inputValue1) > balance) {
          openMsg(t('purchase.moreThanBalanceMsg'));
        } else {
          const args: IPurchaseArg = {
            fromType: redeemTokenType as TOKEN_TYPE.USDC | TOKEN_TYPE.USDT,
            toType: tokenType as TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMATIC,
            amount: Number(inputValue1),
            slippage,
            signerOrProvider: ethersProvider!.getSigner(),
          };

          return purchaseMutate(args);
        }
      })
      .then(() => {})
      .catch(error => {
        handleError(error);
      })
      .finally(() => {
        onTransferOver();
      });
  };

  const doRedeem = () => {
    openBackLoading();
    refetchBalance()
      .then(({ data }) => {
        if (!data) return Promise.reject();
        const balance = parseFloat(data);
        if (parseFloat(inputValue1) > balance) {
          openMsg(t('redeem.moreThanBalanceMsg'));
        } else {
          const args: IRedeemArg = {
            fromType: tokenType as TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMATIC,
            toType: redeemTokenType as TOKEN_TYPE.USDC | TOKEN_TYPE.stMATIC,
            amount: Number(inputValue1),
            signerOrProvider: ethersProvider!.getSigner(),
            slippage,
          };
          return redeemMutate(args);
        }
      })
      .catch(error => {
        handleError(error);
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
      <Toolbar sx={{ width: '98%', alignSelf: 'flex-start', margin: '0 auto' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
          <span>{type === 0 ? t('purchase.purchaseValue') : t('redeem.redeemValue')}</span>
          <SlippagePopover slippage={slippage} setSlippage={setSlippage} resetVal={resetVal} />
        </Typography>
      </Toolbar>

      {/* 卡片1 */}
      <ContentBottom sx={{}} className="contentBottom">
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
              needApprove={needApprove}
            />
          </CardContent>
        ) : (
          <></>
        )}
      </ContentBottom>

      {/* cover btn */}
      <ConverBtn className="coverBtn">
        <IconButton className="iconBtn" onClick={() => setAnimation()}>
          <BaseIconFont name="icon-qiehuan" style={{ fill: 'white', height: '100%' }} />
        </IconButton>
      </ConverBtn>

      {/* 卡片2 */}
      <ContentTop sx={{}} className="contentTop">
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

      {/* 单位换算/*/}
      {inputValue1 ? (
        <UnitconverContent>
          <p>
            <BaseIconFont name="icon-Prompt" />
            <span>
              1 {TOKEN_TYPE[redeemTokenType]} ≈ {tokenRate + ' ' + TOKEN_TYPE[tokenType]}
            </span>
          </p>
        </UnitconverContent>
      ) : (
        <></>
      )}

      {/* 购买、赎回按钮 */}
      <Button
        sx={{ width: '90%', marginTop: theme.spacing(5) }}
        variant="contained"
        disableElevation
        disabled={(!needApprove && (!inputValue1 || !+inputValue1)) || loadingOpen}
        onClick={() =>
          needApprove
            ? doApprove()
            : type === TRANSFER_TYPE.PURCHASE
            ? doPurchase()
            : type === TRANSFER_TYPE.REDEEM
            ? doRedeem()
            : null
        }
      >
        {loadingOpen ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 1 }}>{loadingText}</Box>
            <CircularProgress size={16} sx={{ color: 'rgba(145, 158, 171, 0.8)' }} />
          </Box>
        ) : needApprove ? (
          t('purchase.approveAction') + TOKEN_TYPE[redeemTokenType]
        ) : type === TRANSFER_TYPE.PURCHASE ? (
          t('purchase.purchaseAction')
        ) : (
          t('redeem.redeemAction')
        )}
      </Button>

      <FooterContent>
        {/*<span>{t('purchase.unitPrice') + ' $' + formatNetWorth(netWorth, true)}</span>*/}
        <span
          style={{ color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.text.primary }}
        >
          {rate ? (
            type === TRANSFER_TYPE.PURCHASE ? (
              t('purchase.EZATRate') + rate + '%'
            ) : (
              t('purchase.feeRate') + feeRate + '%'
            )
          ) : (
            <InlineSkeleton />
          )}
        </span>

        {/* 当前时间 */}
        {/*<DateNow>*/}
        {/*  {t('purchase.currentTime')}: {time}*/}
        {/*</DateNow>*/}
      </FooterContent>
    </PurchaseContainer>
  );
}
