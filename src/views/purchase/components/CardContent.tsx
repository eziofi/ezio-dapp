import { Box, Button, InputBase, MenuItem, Select, Skeleton, styled, TextField, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { BalanceContent, BodyContent } from '../PurchaseStyle';
import { t } from 'i18next';
import { useBalance } from '../../../hooks/useBalance';
import { formatString } from '../../wallet/helpers/utilities';
import { ATokenMap, REVERSE_COIN, TOKEN_TYPE, TRANSFER_TYPE } from '../../wallet/helpers/constant';
import BaseIconFont from '../../components/BaseIconFont';
import { usePrice } from '../../../hooks/usePrice';
import { InlineSkeleton } from '../../components/Skeleton';
import useWallet from '../../hooks/useWallet';
import TokenTypeDialog from './TokenTypeDialog';

interface IProps {
  isBuy?: boolean;
  setIsBuy: (buy: boolean) => void;
  transactionType: TRANSFER_TYPE.PURCHASE | TRANSFER_TYPE.REDEEM;
  getTokenType: (tokenType: TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP) => void;
  getInputVal1: (InputVal: string) => void | any;
  getInputVal2: (InputVal: string) => void | any;
  inputValue2: string;
  tokenType: TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP;
  redeemTokenType: TOKEN_TYPE;
  setRedeemTokenType: (redeemTokenType: TOKEN_TYPE.USDC | TOKEN_TYPE.USDT | TOKEN_TYPE.ReverseCoin) => void;
  inputValue1: string;
  needApprove: boolean;
  pricePercentage: string;
}

interface IOptions {
  value: TOKEN_TYPE;
  iconParentStyle: any;
  iconName: string;
  iconStyle: { width: number; height: number; fill: string };
}

type CardContentOneProps = Pick<
  IProps,
  | 'isBuy'
  | 'transactionType'
  | 'getInputVal1'
  | 'getTokenType'
  | 'tokenType'
  | 'redeemTokenType'
  | 'setRedeemTokenType'
  | 'inputValue1'
  | 'needApprove'
>;
type CardContentSecondProps = Pick<
  IProps,
  | 'transactionType'
  | 'inputValue2'
  | 'getTokenType'
  | 'tokenType'
  | 'redeemTokenType'
  | 'setRedeemTokenType'
  | 'isBuy'
  | 'getInputVal2'
  | 'pricePercentage'
>;

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 15,
    position: 'relative',
    // @ts-ignore
    backgroundColor: theme.palette.purchase.menuItemBg,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 15,
    },
  },
}));

const CssTextField = styled(TextField)(() => {
  const theme = useTheme();
  return {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '#custom-css-outlined-input': {
        fontSize: 32,
        maxWidth: 180,
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
        padding: 0,
      },
    },
  };
});

const MenuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  borderRadius: '50%',
};

/**
 * 渲染各种币的下拉框
 * @param Options icon图标
 * @param tokenType 币的类型
 * @param handleChange 更改币的类型的函数
 * @param balance 余额
 * @param showMaxVal 是否显示最大值
 * @param inputVal 购买值
 * @param setInputVal 设置购买值
 * @param transactionType 购买还是赎回
 * @returns SelectItem
 */
function RanderOptions(
  Options: IOptions[],
  tokenType: TOKEN_TYPE,
  handleChange: (value: keyof TOKEN_TYPE) => void,
  balance: undefined | string,
  showMaxVal: boolean,
  transactionType: TRANSFER_TYPE.PURCHASE | TRANSFER_TYPE.REDEEM,
  inputVal?: string,
  setInputVal?: (value: string) => void,
) {
  const theme = useTheme();
  const { reverseCoin, networkName } = useWallet();

  const [openDialog, setopenDialog] = useState(false);

  function handleClickOpen() {
    setopenDialog(true);
  }

  function handleClose(tokenType?: TOKEN_TYPE) {
    if (tokenType !== undefined || '' || null) {
      // @ts-ignore
      handleChange(tokenType as TOKEN_TYPE);
      console.log(tokenType);
    }

    setopenDialog(false);
  }

  return (
    <BalanceContent>
      <Select
        value={tokenType}
        // @ts-ignore
        onChange={e => handleChange(e.target.value as typeof TOKEN_TYPE)}
        input={<BootstrapInput />}
        sx={{ height: 46 }}
        open={false}
        onOpen={handleClickOpen}
      >
        {Options.map((item: IOptions, index: number) => {
          return (
            <MenuItem value={item.value} key={index}>
              <>
                <div
                  style={{
                    ...MenuItemStyle,
                    ...item.iconParentStyle,
                  }}
                >
                  <BaseIconFont
                    name={tokenType === TOKEN_TYPE['ReverseCoin'] ? `icon-${reverseCoin}` : item.iconName}
                    style={item.iconStyle}
                  />
                </div>
                {tokenType === TOKEN_TYPE['ReverseCoin']
                  ? networkName && REVERSE_COIN[networkName]
                  : tokenType === TOKEN_TYPE.E2LP
                  ? networkName && ATokenMap[networkName]
                  : TOKEN_TYPE[item.value as TOKEN_TYPE]}
              </>
            </MenuItem>
          );
        })}
      </Select>
      <div
        style={{
          width: '150px',
          fontSize: 12,
          color: theme.palette.text.secondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '10px',
        }}
      >
        {t('purchase.leftBalance') + ''}
        <span style={{ maxWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {balance ? formatString(balance, 6).toString() : <InlineSkeleton width={40} />}
        </span>
        {showMaxVal && inputVal !== balance && (
          <Box
            onClick={() => {
              if (transactionType === TRANSFER_TYPE.PURCHASE) {
                setInputVal!(formatString(balance || '', 6).toString());
              } else if (transactionType === TRANSFER_TYPE.REDEEM) {
                setInputVal!(formatString(balance || '', 18).toString());
              }
            }}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              marginLeft: theme.spacing(1),
              ':hover': {
                cursor: 'pointer',
              },
            }}
          >
            <>{t('purchase.maxValue')}</>
          </Box>
        )}
      </div>
      {openDialog && (
        <TokenTypeDialog openDialog={openDialog} handleClose={handleClose} Options={Options} tokenType={tokenType} />
      )}
    </BalanceContent>
  );
}

const PurchaseOptions: IOptions[] = [
  {
    value: TOKEN_TYPE.USDE,
    iconParentStyle: { margin: '0 10px', background: 'none' },
    iconName: 'icon-USDE',
    iconStyle: { width: 30, height: 30, fill: 'red' },
  },
  {
    value: TOKEN_TYPE.E2LP,
    iconParentStyle: { margin: '0 10px', background: 'none' },
    iconName: 'icon-E2LP',
    iconStyle: { width: 30, height: 30, fill: 'white' },
  },
];

// 宽高 30 是因为他们没有背景色 显得图标会小 宽高30是同父级宽高,是button的宽高
const redeemOptions: IOptions[] = [
  {
    value: TOKEN_TYPE.USDT,
    iconParentStyle: { margin: '0 10px', background: 'none' },
    iconName: 'icon-usdt',
    iconStyle: { width: 30, height: 30, fill: 'white' },
  },
  {
    value: TOKEN_TYPE.USDC,
    iconParentStyle: { margin: '0 10px', background: 'none' },
    iconName: 'icon-usdc',
    iconStyle: { width: 30, height: 30, fill: 'white' },
  },
  {
    value: TOKEN_TYPE.ReverseCoin,
    iconParentStyle: { margin: '0 10px', background: 'none' },
    iconName: 'icon-wstETH1',
    iconStyle: { width: 30, height: 30, fill: 'white' },
  },
];

const INPUT_PARENT_HEIGHT = 83; // 输入框父级高度

//参考单价
const priceStyle = {
  fontSize: 12,
  marginTop: 10,
};

function MyCardContentOne({
  transactionType,
  getTokenType,
  getInputVal1,
  tokenType,
  redeemTokenType,
  setRedeemTokenType,
  isBuy,
  inputValue1,
  needApprove,
}: CardContentOneProps) {
  const { price } = usePrice(isBuy ? redeemTokenType : tokenType);

  // const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (value: TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP) => {
    getTokenType(value);
    // SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };

  const redeemChange = (value: TOKEN_TYPE.USDC | TOKEN_TYPE.USDT | TOKEN_TYPE.ReverseCoin) => {
    setRedeemTokenType(value);
  };

  const { balance } = useBalance(transactionType === TRANSFER_TYPE.PURCHASE ? redeemTokenType : tokenType);

  const theme = useTheme();

  return (
    <BodyContent>
      <div style={{ height: INPUT_PARENT_HEIGHT }}>
        <CssTextField
          id="custom-css-outlined-input"
          size="small"
          placeholder="0"
          onInput={(e: any) => {
            if (e.target.value !== '') {
              transactionType === TRANSFER_TYPE.PURCHASE
                ? getInputVal1(e.target.value.replace(/^\D*(\d*(?:\.\d{0,6})?).*$/g, '$1'))
                : getInputVal1(e.target.value.replace(/^\D*(\d*(?:\.\d{0,18})?).*$/g, '$1'));
            } else {
              // 禁止输入框输入 e + -符号
              e.target.value = e.target.value.replace(/[e\+\-]/, '');
              getInputVal1(e.target.value);
            }
          }}
          type="number"
          value={inputValue1}
          // disabled={needApprove}
        />
        <div style={{ ...priceStyle, color: theme.palette.text.secondary }}>
          {price ? t('purchase.unitPrice') + ': $' + price : <Skeleton width={100} />}
        </div>
      </div>
      {transactionType === TRANSFER_TYPE.PURCHASE
        ? RanderOptions(
            redeemOptions.filter(item => item.value !== TOKEN_TYPE.ReverseCoin),
            redeemTokenType,
            // @ts-ignore
            redeemChange,
            balance,
            true,
            transactionType,
            inputValue1,
            getInputVal1,
          )
        : RanderOptions(
            PurchaseOptions,
            tokenType,
            // @ts-ignore
            handleChange,
            balance,
            true,
            transactionType,
            inputValue1,
            getInputVal1,
          )}
    </BodyContent>
  );
}

function MyCardContentSecond({
  transactionType,
  getTokenType,
  inputValue2,
  tokenType,
  redeemTokenType,
  setRedeemTokenType,
  isBuy,
  getInputVal2,
  pricePercentage,
}: CardContentSecondProps) {
  const { price } = usePrice(isBuy ? tokenType : redeemTokenType);
  const { balance } = useBalance(transactionType === TRANSFER_TYPE.PURCHASE ? tokenType : redeemTokenType);

  // const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (value: TOKEN_TYPE.USDE | TOKEN_TYPE.E2LP) => {
    getTokenType(value);
    // SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };

  const redeemChange = (value: TOKEN_TYPE.USDC | TOKEN_TYPE.USDT | TOKEN_TYPE.ReverseCoin) => {
    setRedeemTokenType(value);
  };

  const theme = useTheme();

  return (
    <>
      <BodyContent>
        <div style={{ height: INPUT_PARENT_HEIGHT }}>
          <CssTextField
            id="custom-css-outlined-input"
            size="small"
            placeholder="0"
            type="number"
            value={inputValue2}
            onInput={(e: any) => {
              if (e.target.value !== '') {
                transactionType === TRANSFER_TYPE.PURCHASE
                  ? getInputVal2(e.target.value.replace(/^\D*(\d*(?:\.\d{0,6})?).*$/g, '$1'))
                  : getInputVal2(e.target.value.replace(/^\D*(\d*(?:\.\d{0,18})?).*$/g, '$1'));
              } else {
                // 禁止输入框输入 e + -符号
                e.target.value = e.target.value.replace(/[e\+\-]/, '');
                getInputVal2(e.target.value);
              }
            }}
          />
          <div style={{ ...priceStyle, color: theme.palette.text.secondary }}>
            {t('purchase.unitPrice') + ': '}
            {price && pricePercentage ? `$${price} (${pricePercentage}%)` : <InlineSkeleton width={70} />}
          </div>
        </div>

        {transactionType === TRANSFER_TYPE.PURCHASE
          ? // @ts-ignore
            RanderOptions(PurchaseOptions, tokenType, handleChange, balance, false, transactionType)
          : tokenType === TOKEN_TYPE.USDE
          ? // <div style={{ width: 142, height: 83, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            //   <div style={{ display: 'flex', alignItems: 'center', height: 46 }}>
            //     <div
            //       style={{
            //         ...MenuItemStyle,
            //         background:
            //           redeemOptions[redeemOptions.findIndex(item => item.value === TOKEN_TYPE.USDC)].iconParentStyle
            //             .background,
            //         marginRight: 10,
            //       }}
            //     >
            //       <BaseIconFont
            //         name="icon-usdc"
            //         style={redeemOptions[redeemOptions.findIndex(item => item.value === TOKEN_TYPE.USDC)].iconStyle}
            //       />
            //     </div>`
            //     <span style={{ fontSize: 14 }}>{TOKEN_TYPE[TOKEN_TYPE.USDC]}</span>
            //   </div>

            //   {/* 显示账户余额 */}
            //   <span style={{ ...priceStyle, color: theme.palette.text.secondary }}>
            //     {t('purchase.leftBalance') + ': '}
            // {balance ? formatString(balance).toString() : <InlineSkeleton width={40} />}
            //   </span>
            // </div>

            RanderOptions(
              redeemOptions.filter(item => item.value === TOKEN_TYPE.USDC),
              TOKEN_TYPE.USDC,
              // @ts-ignore
              redeemChange,
              balance,
              false,
              transactionType,
            )
          : RanderOptions(
              redeemOptions.filter(item => item.value !== TOKEN_TYPE.USDT),
              redeemTokenType,
              // @ts-ignore
              redeemChange,
              balance,
              false,
              transactionType,
            )}
      </BodyContent>
    </>
  );
}

export { MyCardContentOne, MyCardContentSecond };
