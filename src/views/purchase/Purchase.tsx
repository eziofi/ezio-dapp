import React, { ReactNode, useContext, useEffect, useState } from 'react';
import './animation.less';
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Signer } from 'ethers';
import { ATokenMap, NETWORK_TYPE, TOKEN_TYPE, TRANSFER_TYPE } from '../wallet/helpers/constant';
import useWallet from '../hooks/useWallet';
import { formatString } from '../wallet/helpers/utilities';
import { useTranslation } from 'react-i18next';
import {
  ContentBottom,
  ContentTop,
  ConverBtn,
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
import useTx from '../../hooks/useTx';
import { InlineSkeleton } from '../components/Skeleton';
import { useFeeRate } from '../../hooks/useFeeRate';
import SlippagePopover from './components/SlippagePopover';
import { UIContext } from '../context/UIProvider';

interface IPurchaseArg {
  fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC;
  toType: TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP;
  amount: number;
  slippage: number;
  signerOrProvider: Signer | Provider;
}

interface IRedeemArg {
  fromType: TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP;
  toType: TOKEN_TYPE.USDC | TOKEN_TYPE.ReverseCoin;
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
  const [inputValue1, setInputValue1] = useState(''); // 上方输入框
  const [inputValue2, setInputValue2] = useState(''); // 下方输入框
  // const [pricePercentage, setPricePercentage] = useState('');
  const [tokenType, setTokenType] = useState<TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP>(TOKEN_TYPE.USDE); // 下拉框value
  const [redeemTokenType, setRedeemTokenType] = useState<TOKEN_TYPE.USDC | TOKEN_TYPE.USDT | TOKEN_TYPE.ReverseCoin>(
    TOKEN_TYPE.USDT,
  ); // 下拉框value
  const theme = useTheme();

  // const [tokenRate, setTokenRate] = useState('1'); // eg. 1 USDT = xxx USDE
  // const [tokenReverseRate, setTokenReverseRate] = useState('1'); // eg. 1 USDE = xxx USDT
  const [tokenRateReverseOpen, setTokenRateReverseOpen] = useState(false);

  const [slippage, setSlippage] = useState<number>(0.5);
  const [resetVal] = useState<number>(0.5);
  // const [time, setTime] = useState<string>();

  const { loadingOpen, loadingText } = useContext(UIContext);

  const { purchase, redeem, approve } = useTx();

  const { openBackLoading, closeBackLoading, setBackLoadingText, openMsg } = useContext(UIContext);

  const { price: fromPrice } = usePrice(type === TRANSFER_TYPE.PURCHASE ? redeemTokenType : tokenType);
  const { price: toPrice } = usePrice(type === TRANSFER_TYPE.PURCHASE ? tokenType : redeemTokenType);

  // 两个token的price比值
  const _rate = fromPrice && toPrice ? parseFloat(fromPrice) / parseFloat(toPrice) : 1;
  const interest = formatString('' + _rate, 6).toString();
  const reverseInterest = formatString('' + 1 / _rate, 6).toString();
  const percentage =
    fromPrice && toPrice ? ((parseFloat(toPrice) - parseFloat(fromPrice)) / parseFloat(fromPrice)) * 100 : 0;
  const pricePercentage = percentage < 0 ? percentage.toFixed(2) : '+' + percentage.toFixed(2);

  const { feeRate } = useFeeRate(tokenType);

  const { t } = useTranslation();

  function reCalcValue2(value: string) {
    if (value && fromPrice && toPrice) {
      const estimatedValue2 = parseFloat(value) * parseFloat(interest);
      setInputValue2(formatString(String(estimatedValue2), 6) + '');
    }
  }

  function getInputVal1(value: string) {
    setInputValue1(value);
    // 计算预计获得
    reCalcValue2(value);
  }

  function reCalcValue1(value: string) {
    if (fromPrice && toPrice) {
      const estimatedValue1 = (parseFloat(value) * parseFloat(toPrice)) / parseFloat(fromPrice);
      const flooredValue = Math.floor(estimatedValue1 * 10 ** 6) / 10 ** 6;
      setInputValue1(flooredValue + '');
    }
  }

  // 反算输入值
  function getInputVal2(value: string) {
    setInputValue2(value);
    // 计算预计获得
    reCalcValue1(value);
  }

  useEffect(() => {
    reCalcValue2(inputValue1);
  }, [redeemTokenType, tokenType]);

  // 改变购买 / 赎回 状态 清空value
  function convert() {
    setInputValue1(inputValue2);
    setInputValue2(inputValue1);
    setType(type === TRANSFER_TYPE.PURCHASE ? TRANSFER_TYPE.REDEEM : TRANSFER_TYPE.PURCHASE);
  }

  function getTokenType(tokenType: TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP) {
    setTokenType(tokenType);
  }

  useEffect(() => {
    queryClient.invalidateQueries(['redeemFeeRate', tokenType]);
  }, [tokenType]);

  const { mutateAsync: purchaseMutate } = useMutation(
    (arg: IPurchaseArg) => purchase(arg.fromType, arg.toType, arg.amount, arg.slippage, arg.signerOrProvider),
    {
      onSuccess: () => {},
      onError: error => {
        console.error(error);
      },
    },
  );

  const { mutateAsync: approveMutate } = useMutation(
    (arg: IApproveArg) => approve(arg.fromType, arg.signerOrProvider),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
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

  const { connectState, ethersProvider, connect, allowanceUSDT, allowanceUSDC, networkName, reverseCoin } = useWallet();

  const [needApprove, setNeedApprove] = useState(false);

  const resetApproveState = () => {
    setNeedApprove(
      type === TRANSFER_TYPE.PURCHASE &&
        ((redeemTokenType === TOKEN_TYPE.USDT && (!allowanceUSDT || parseFloat(allowanceUSDT) === 0)) ||
          (redeemTokenType === TOKEN_TYPE.USDC && (!allowanceUSDC || parseFloat(allowanceUSDC) === 0))),
    );
    // setNeedApprove(true);
  };

  useEffect(() => {
    if (allowanceUSDT && allowanceUSDC) {
      resetApproveState();
    }
  }, [redeemTokenType, type, allowanceUSDT, allowanceUSDC]);

  const { data: dayRate } = useQuery(
    ['USDEDayRate'],
    () => interestRateYear(ethersProvider!.getSigner(), networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!networkName,
      // onSuccess: data => {
      //   const res = formatNetWorth(data);
      //   debugger;
      // },
    },
  );

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
            toType: tokenType as TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP,
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
            fromType: tokenType as TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP,
            toType: redeemTokenType as TOKEN_TYPE.USDC | TOKEN_TYPE.ReverseCoin,
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
      // type 为购买时 && redeemTokenType = reverseCoin, redeemTokenType赋值 为 USDT 因为购买时的下拉框value不存reverseCoin 会导致value为空
      setRedeemTokenType(TOKEN_TYPE.USDT);
    }
  }, [type]);

  const MutationButton = ({
    children,
    disabled,
    onClick,
    loadingOpen,
    loadingText,
  }: {
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    loadingOpen?: boolean;
    loadingText?: string;
  }) => (
    <Button
      sx={{ width: '90%', marginTop: theme.spacing(2), borderRadius: '15px', fontSize: 18 }}
      variant="contained"
      size={'large'}
      disabled={disabled}
      onClick={onClick}
    >
      {loadingOpen ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 1 }}>{loadingText || ''}</Box>
          <CircularProgress size={16} sx={{ color: 'rgba(145, 158, 171, 0.8)' }} />
        </Box>
      ) : (
        children
      )}
    </Button>
  );

  const redeemTokenName = redeemTokenType === TOKEN_TYPE.ReverseCoin ? reverseCoin : TOKEN_TYPE[redeemTokenType];

  return (
    <Container maxWidth="lg">
      <PurchaseContainer>
        <Toolbar sx={{ width: '98%' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>{type === TRANSFER_TYPE.PURCHASE ? t('purchase.purchaseValue') : t('redeem.redeemValue')}</span>
            <SlippagePopover slippage={slippage} setSlippage={setSlippage} resetVal={resetVal} />
          </Typography>
        </Toolbar>

        {/* 卡片1 */}
        <ContentBottom sx={{}} className="contentBottom">
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
        </ContentBottom>

        {/* cover btn */}
        <ConverBtn className="coverBtn">
          <IconButton className="iconBtn" onClick={() => convert()}>
            <BaseIconFont name="icon-qiehuan" />
          </IconButton>
        </ConverBtn>

        {/* 卡片2 */}
        <ContentTop
          sx={inputValue1 ? { borderBottomRightRadius: '0', borderBottomLeftRadius: '0' } : {}}
          className="contentTop"
        >
          <CardContent>
            <MyCardContentSecond
              isBuy={type === TRANSFER_TYPE.PURCHASE}
              transactionType={type}
              tokenType={tokenType}
              getTokenType={getTokenType}
              inputValue2={inputValue2}
              getInputVal2={getInputVal2}
              redeemTokenType={redeemTokenType}
              setRedeemTokenType={setRedeemTokenType}
              pricePercentage={pricePercentage}
            />
          </CardContent>
        </ContentTop>

        {/* 单位换算/*/}
        {inputValue1 ? (
          <UnitconverContent>
            <p>
              {/*<BaseIconFont name="icon-Prompt" />*/}
              {tokenRateReverseOpen ? (
                <span onClick={() => setTokenRateReverseOpen(!tokenRateReverseOpen)} style={{ cursor: 'pointer' }}>
                  {type === TRANSFER_TYPE.PURCHASE
                    ? `1 ${TOKEN_TYPE[tokenType]} ≈ ${reverseInterest} ${redeemTokenName}`
                    : `1 ${redeemTokenName} ≈ ${reverseInterest} ${TOKEN_TYPE[tokenType]}`}
                </span>
              ) : (
                <span onClick={() => setTokenRateReverseOpen(!tokenRateReverseOpen)} style={{ cursor: 'pointer' }}>
                  {type === TRANSFER_TYPE.PURCHASE
                    ? `1 ${redeemTokenName} ≈ ${interest} ${TOKEN_TYPE[tokenType]}`
                    : `1 ${TOKEN_TYPE[tokenType]} ≈ ${interest} ${redeemTokenName}`}
                </span>
              )}
            </p>
          </UnitconverContent>
        ) : (
          <></>
        )}

        {connectState === 'unconnected' ? (
          // 连接钱包按钮
          <MutationButton onClick={connect}>{t('home.login')}</MutationButton>
        ) : needApprove ? (
          // 授权按钮
          <MutationButton
            disabled={loadingOpen}
            onClick={doApprove}
            loadingOpen={loadingOpen}
            loadingText={loadingText}
          >
            {t('purchase.approveAction') +
              (redeemTokenType === TOKEN_TYPE.ReverseCoin ? reverseCoin : TOKEN_TYPE[redeemTokenType])}
          </MutationButton>
        ) : parseFloat(inputValue1) > parseFloat(balance || '0') ? (
          // 余额不足
          <MutationButton disabled>{t('purchase.notEnoughBalance')}</MutationButton>
        ) : type === TRANSFER_TYPE.PURCHASE ? (
          // allowance不足
          (
            redeemTokenType === TOKEN_TYPE.USDC
              ? parseFloat(allowanceUSDC) < parseFloat(inputValue1)
              : parseFloat(allowanceUSDT) < parseFloat(inputValue1)
          ) ? (
            // allowance不足
            <MutationButton
              disabled={loadingOpen}
              onClick={doApprove}
              loadingOpen={loadingOpen}
              loadingText={loadingText}
            >
              {t('purchase.approveAction') +
                (redeemTokenType === TOKEN_TYPE.ReverseCoin ? reverseCoin : TOKEN_TYPE[redeemTokenType])}
            </MutationButton>
          ) : (
            // 购买按钮
            <MutationButton
              disabled={!inputValue1 || !+inputValue1 || loadingOpen}
              onClick={doPurchase}
              loadingOpen={loadingOpen}
              loadingText={loadingText}
            >
              {t('purchase.purchaseAction')}
            </MutationButton>
          )
        ) : type === TRANSFER_TYPE.REDEEM ? (
          // 赎回按钮
          <MutationButton
            disabled={!inputValue1 || !+inputValue1 || loadingOpen}
            onClick={doRedeem}
            loadingOpen={loadingOpen}
            loadingText={loadingText}
          >
            {t('redeem.redeemAction')}
          </MutationButton>
        ) : (
          <></>
        )}

        <FooterContent>
          {/*<span>{t('purchase.unitPrice') + ' $' + formatNetWorth(netWorth, true)}</span>*/}
          <span
            style={{ color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.text.primary }}
          >
            {dayRate ? (
              <>
                {networkName === NETWORK_TYPE.arbitrum ? (
                  <span>{TOKEN_TYPE[tokenType] + t('purchase.feeRate') + ': '}</span>
                ) : (
                  <span>{ATokenMap[NETWORK_TYPE.polygon] + t('purchase.feeRate') + ': '}</span>
                )}
                {feeRate ? <span>{feeRate}</span> : <InlineSkeleton width={40} />}
              </>
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
    </Container>
  );
}
