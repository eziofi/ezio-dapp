import { InputBase, MenuItem, Select, Skeleton, styled, useTheme } from '@mui/material';
import React from 'react';
import { BalanceContent, BodyContent } from '../purchase/PurchaseStyle';
import { t } from 'i18next';
import { useBalance } from '../../hooks/useBalance';
import { formatDecimal } from '../wallet/helpers/utilities';
import TextField from '@mui/material/TextField';
import { TOKEN_TYPE, TRANSFER_TYPE } from '../wallet/helpers/constant';
import BaseIconFont from './BaseIconFont';
import { usePrice } from '../../hooks/usePrice';
import { BigNumber } from 'ethers';
import { InlineSkeleton } from './Skeleton';

interface IProps {
  isBuy?: boolean;
  setIsBuy: (buy: boolean) => void;
  transactionType: TRANSFER_TYPE.PURCHASE | TRANSFER_TYPE.REDEEM;
  getTokenType: (tokenType: TOKEN_TYPE) => void;
  getInputVal1: (InputVal: string) => void | any;
  inputValue2: string;
  tokenType: TOKEN_TYPE;
  redeemTokenType: TOKEN_TYPE;
  setRedeemTokenType: (redeemTokenType: TOKEN_TYPE) => void;
  inputValue1: string;
}

interface IOptions {
  value: TOKEN_TYPE;
  style: { margin: string; background: string };
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
>;
type CardContentSencoedProps = Pick<
  IProps,
  'transactionType' | 'inputValue2' | 'getTokenType' | 'tokenType' | 'redeemTokenType' | 'setRedeemTokenType' | 'isBuy'
>;

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 15,
    width: 110,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(247, 239, 255, 1)' : theme.palette.grey[700],
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
        width: 150,
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
        padding: 0,
      },
    },
  };
});

const iconStyle = {
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
 * @returns SelectItem
 */
function RanderOptions(
  Options: IOptions[],
  tokenType: TOKEN_TYPE,
  handleChange: (value: TOKEN_TYPE) => void,
  balance: undefined | BigNumber,
) {
  const theme = useTheme();
  return (
    <BalanceContent>
      <Select
        id="demo-customized-select-native"
        value={tokenType}
        // @ts-ignore
        onChange={e => handleChange(e.target.value as typeof TOKEN_TYPE)}
        input={<BootstrapInput />}
      >
        {Options.map((item: IOptions, index: number) => {
          return (
            <MenuItem value={item.value} key={index}>
              <>
                <div
                  style={{
                    ...iconStyle,
                    ...item.style,
                  }}
                >
                  <BaseIconFont name={item.iconName} style={item.iconStyle} />
                </div>
                {TOKEN_TYPE[item.value]}
              </>
            </MenuItem>
          );
        })}
      </Select>
      <span
        style={{
          fontSize: 12,
          color: theme.palette.text.secondary,
          marginTop: 5,
        }}
      >
        {t('purchase.leftBalance') + ': '}
        {balance ? formatDecimal(balance, tokenType, 6).toString() : <InlineSkeleton width={40} />}
      </span>
    </BalanceContent>
  );
}

const PurchasenOptions: IOptions[] = [
  {
    value: TOKEN_TYPE.ezUSD,
    style: { margin: '0 10px', background: 'rgba(95, 69, 186, 1)' },
    iconName: 'icon-A',
    iconStyle: { width: 20, height: 20, fill: 'white' },
  },
  {
    value: TOKEN_TYPE.ezMATIC,
    style: { margin: '0 10px', background: 'rgba(239, 89, 114, 1)' },
    iconName: 'icon-B',
    iconStyle: { width: 20, height: 20, fill: 'white' },
  },
];

// 宽高 30 是因为他们没有背景色 显得图标会小 宽高30是同父级宽高,是button的宽高
const redeemOptions: IOptions[] = [
  {
    value: TOKEN_TYPE.USDT,
    style: { margin: '0 10px', background: 'none' },
    iconName: 'icon-usdt',
    iconStyle: { width: 30, height: 30, fill: 'white' },
  },
  {
    value: TOKEN_TYPE.USDC,
    style: { margin: '0 10px', background: 'none' },
    iconName: 'icon-usdc',
    iconStyle: { width: 30, height: 30, fill: 'white' },
  },
  {
    value: TOKEN_TYPE.stMATIC,
    style: { margin: '0 10px', background: 'none' },
    iconName: 'icon-stMatic1',
    iconStyle: { width: 30, height: 30, fill: 'white' },
  },
];

function MyCardContentOne({
  transactionType,
  getTokenType,
  getInputVal1,
  tokenType,
  redeemTokenType,
  setRedeemTokenType,
  isBuy,
  inputValue1,
}: CardContentOneProps) {
  const { price } = usePrice(isBuy ? redeemTokenType : tokenType);

  // const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (value: TOKEN_TYPE) => {
    getTokenType(value);
    // SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };

  const redeemChange = (value: TOKEN_TYPE) => {
    setRedeemTokenType(value);
  };

  const { balance } = useBalance(transactionType === TRANSFER_TYPE.PURCHASE ? redeemTokenType : tokenType);

  const theme = useTheme();

  return (
    <BodyContent>
      <div>
        <CssTextField
          id="custom-css-outlined-input"
          size="small"
          placeholder="0"
          onInput={(e: any) => {
            if (e.target.value !== '') {
              // 限制输入小数点后六位
              getInputVal1(e.target.value.replace(/^\D*(\d*(?:\.\d{0,6})?).*$/g, '$1'));
            } else {
              // 禁止输入框输入 e + -符号
              e.target.value = e.target.value.replace(/[e\+\-]/, '');
              getInputVal1(e.target.value);
            }
          }}
          type="number"
          value={inputValue1}
        />
        <div
          style={{
            fontSize: 12,
            color: theme.palette.text.secondary,
            marginTop: 5,
            height: 18,
          }}
        >
          {price ? t('purchase.unitPrice') + ': ' + price + ' USDC' : <Skeleton width={100} />}
        </div>
      </div>
      {transactionType === TRANSFER_TYPE.PURCHASE
        ? RanderOptions(
            redeemOptions.filter(item => item.value !== TOKEN_TYPE.stMATIC),
            redeemTokenType,
            redeemChange,
            balance,
          )
        : RanderOptions(PurchasenOptions, tokenType, handleChange, balance)}
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
}: CardContentSencoedProps) {
  const { price } = usePrice(isBuy ? tokenType : redeemTokenType);
  const { balance } = useBalance(transactionType === TRANSFER_TYPE.PURCHASE ? tokenType : redeemTokenType);

  // const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (value: TOKEN_TYPE) => {
    getTokenType(value);
    // SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };

  const redeemChange = (value: TOKEN_TYPE) => {
    setRedeemTokenType(value);
  };

  const theme = useTheme();

  return (
    <BodyContent>
      <div>
        <CssTextField
          id="custom-css-outlined-input"
          size="small"
          placeholder="0"
          // onChange={e => getInputVal2(e.target.value)}
          type="number"
          value={inputValue2}
          disabled
        />
        <div
          style={{
            fontSize: 12,
            color: theme.palette.text.secondary,
            marginTop: 5,
          }}
        >
          {/*{t('purchase.estimated')}*/}
          {price ? t('purchase.unitPrice') + ': ' + price + ' USDC' : <Skeleton width={100} />}
        </div>
      </div>

      {transactionType === TRANSFER_TYPE.PURCHASE ? (
        RanderOptions(PurchasenOptions, tokenType, handleChange, balance)
      ) : tokenType === TOKEN_TYPE.ezUSD ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 5, height: 46 }}>
            <div
              style={{
                ...iconStyle,
                background:
                  redeemOptions[redeemOptions.findIndex(item => item.value === TOKEN_TYPE.USDC)].style.background,
                marginRight: 5,
              }}
            >
              <BaseIconFont
                name="icon-usdc"
                style={redeemOptions[redeemOptions.findIndex(item => item.value === TOKEN_TYPE.USDC)].iconStyle}
              />
            </div>
            {TOKEN_TYPE[TOKEN_TYPE.USDC]}
          </div>
          {/* <div style={{ height: 18, visibility: 'hidden' }} /> */}
          {/* 显示账户余额 */}
          <span
            style={{
              fontSize: 12,
              color: theme.palette.text.secondary,
              marginTop: 5,
            }}
          >
            {t('purchase.leftBalance') + ': '}
            {balance ? formatDecimal(balance, tokenType, 6).toString() : <InlineSkeleton width={40} />}
          </span>
        </div>
      ) : (
        RanderOptions(
          redeemOptions.filter(item => item.value !== TOKEN_TYPE.USDT),
          redeemTokenType,
          redeemChange,
          balance,
        )
      )}
    </BodyContent>
  );
}

export { MyCardContentOne, MyCardContentSecond };
