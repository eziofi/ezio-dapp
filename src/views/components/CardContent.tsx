import { InputBase, MenuItem, Select, SelectChangeEvent, styled, useTheme } from '@mui/material';
import React from 'react';
import { BalanceContent, BodyContent } from '../purchase/PurchaseStyle';
import { useTranslation } from 'react-i18next';
import { useBalance } from '../../hooks/useBalance';
import { formatNetWorth, formatNum } from '../../views/wallet/helpers/utilities';
import TextField from '@mui/material/TextField';
import { TOKEN_BALANCE_TYPE, TOKEN_TYPE, TRANSFER_TYPE } from '../../views/wallet/helpers/constant';
import BaseIconFont from './BaseIconFont';
import { useNetWorth } from '../../hooks/useNetWorth';
import { BigNumber } from 'ethers';

interface IProps {
  isBuy?: boolean;
  setIsBuy: (buy: boolean) => void;
  transactionType: TRANSFER_TYPE.PURCHASE | TRANSFER_TYPE.REDEEM;
  getTokenType: (tokenType: TOKEN_BALANCE_TYPE) => void;
  getInputVal1: (InputVal: string) => void | any;
  inputValue2: string;
  tokenType: TOKEN_BALANCE_TYPE;
  redeemTokenType: TOKEN_BALANCE_TYPE;
  setredeemTokenType: (redeemTokenType: TOKEN_BALANCE_TYPE) => void;
}

interface IOptions {
  value: TOKEN_BALANCE_TYPE;
  style: { margin: string; background: string };
  iconName: string;
  iconStyle: { width: number; height: number; fill: string };
}

type CardContentOneProps = Pick<
  IProps,
  'isBuy' | 'transactionType' | 'getInputVal1' | 'getTokenType' | 'tokenType' | 'redeemTokenType' | 'setredeemTokenType'
>;
type CardContentSencoedProps = Pick<
  IProps,
  'transactionType' | 'inputValue2' | 'getTokenType' | 'tokenType' | 'redeemTokenType' | 'setredeemTokenType'
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

function RanderOptions(
  Options: IOptions[],
  tokenType: keyof typeof TOKEN_BALANCE_TYPE,
  handleChange: (event: SelectChangeEvent) => void,
  isShowBalance?: boolean,
  balance?: BigNumber,
) {
  const theme = useTheme();
  let translate: any;
  if (isShowBalance) {
    translate = useTranslation().t;
  }
  return (
    <BalanceContent>
      <Select id="demo-customized-select-native" value={tokenType} onChange={handleChange} input={<BootstrapInput />}>
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
                {item.value}
              </>
            </MenuItem>
          );
        })}
      </Select>
      {isShowBalance ? (
        <span
          style={{
            fontSize: 12,
            color: theme.palette.text.secondary,
            marginTop: 5,
          }}
        >
          {translate('purchase.leftBalance')}: {balance ? formatNum(balance, tokenType).toUnsafeFloat().toFixed(2) : 0}
        </span>
      ) : (
        <div style={{ height: 18, visibility: 'hidden' }} />
      )}
    </BalanceContent>
  );
}

const PurchasenOptions: IOptions[] = [
  {
    value: TOKEN_BALANCE_TYPE.EZAT,
    style: { margin: '0 10px', background: 'rgba(95, 69, 186, 1)' },
    iconName: 'icon-A',
    iconStyle: { width: 20, height: 20, fill: 'white' },
  },
  {
    value: TOKEN_BALANCE_TYPE.EZBT,
    style: { margin: '0 10px', background: 'rgba(26, 107, 173, 1)' },
    iconName: 'icon-B',
    iconStyle: { width: 20, height: 20, fill: 'white' },
  },
];

const redeemOptions: IOptions[] = [
  {
    value: TOKEN_BALANCE_TYPE.USDC,
    style: { margin: '0 10px', background: 'rgba(60, 193, 200)' },
    iconName: 'icon-USDC-white',
    iconStyle: { width: 20, height: 20, fill: 'white' },
  },
  {
    value: TOKEN_BALANCE_TYPE.USDT,
    style: { margin: '0 10px', background: 'rgba(50, 177, 108)' },
    iconName: 'icon-USDT-white',
    iconStyle: { width: 20, height: 20, fill: 'white' },
  },
  {
    value: TOKEN_BALANCE_TYPE.stMatic,
    style: { margin: '0 10px', background: 'rgba(239, 89, 114)' },
    iconName: 'icon-stMatic-white',
    iconStyle: { width: 20, height: 20, fill: 'white' },
  },
];

function MyCardContentOne({
  transactionType,
  getTokenType,
  getInputVal1,
  tokenType,
  redeemTokenType,
  setredeemTokenType,
  isBuy,
}: CardContentOneProps) {
  const { netWorth } = useNetWorth(TOKEN_BALANCE_TYPE[tokenType as keyof typeof TOKEN_BALANCE_TYPE]);

  // const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (event: { target: { value: string } }) => {
    getTokenType(event.target.value as TOKEN_BALANCE_TYPE);
    // SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };

  const redeemChange = (event: SelectChangeEvent) => {
    setredeemTokenType(event.target.value as TOKEN_BALANCE_TYPE);
  };

  const { balance } = useBalance(
    transactionType === TRANSFER_TYPE.PURCHASE
      ? redeemTokenType
      : tokenType === 'EZAT'
      ? TOKEN_BALANCE_TYPE.EZAT
      : TOKEN_BALANCE_TYPE.EZBT,
  );

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <BodyContent>
      <div>
        <CssTextField
          id="custom-css-outlined-input"
          size="small"
          placeholder="0"
          onChange={e => getInputVal1(e.target.value)}
          type="number"
        />
        <div
          style={{
            fontSize: 12,
            color: theme.palette.text.secondary,
            marginTop: 5,
            height: 18,
          }}
        >
          {isBuy ? '' : t('purchase.unitPrice') + ' $' + formatNetWorth(netWorth, true)}
        </div>
      </div>
      {transactionType === TRANSFER_TYPE.PURCHASE
        ? RanderOptions(
            redeemOptions.filter(item => item.value !== TOKEN_BALANCE_TYPE.stMatic),
            redeemTokenType,
            redeemChange,
            true,
            balance,
          )
        : RanderOptions(PurchasenOptions, tokenType, handleChange, true, balance)}
    </BodyContent>
  );
}

function MyCardContentSecond({
  transactionType,
  getTokenType,
  inputValue2,
  tokenType,
  redeemTokenType,
  setredeemTokenType,
}: CardContentSencoedProps) {
  // const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (event: SelectChangeEvent) => {
    getTokenType(event.target.value as TOKEN_BALANCE_TYPE);
    // SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };

  const redeemChange = (event: SelectChangeEvent) => {
    setredeemTokenType(event.target.value as TOKEN_BALANCE_TYPE);
  };

  const theme = useTheme();
  const { t } = useTranslation();
  // const { balance, refetchBalance } = useBalance(
  //   transactionType === TRANSFER_TYPE.PURCHASE
  //     ? TOKEN_BALANCE_TYPE.USDT
  //     : currency === 'EZAT'
  //     ? TOKEN_BALANCE_TYPE.EZAT
  //     : TOKEN_BALANCE_TYPE.EZBT,
  // );

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
        />
        <div
          style={{
            fontSize: 12,
            color: theme.palette.text.secondary,
            marginTop: 5,
          }}
        >
          {t('purchase.estimated')}
        </div>
      </div>
      {/* {transactionType === TRANSFER_TYPE.PURCHASE
        ? RanderOptions(PurchasenOptions, tokenType, handleChange)
        : RanderOptions(redeemOptions, redeemTokenType, redeemChange)} */}
      {transactionType === TRANSFER_TYPE.PURCHASE ? (
        RanderOptions(PurchasenOptions, tokenType, handleChange)
      ) : tokenType === TOKEN_BALANCE_TYPE.EZAT ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 5, height: 46 }}>
            <div
              style={{
                ...iconStyle,
                background:
                  redeemOptions[redeemOptions.findIndex(item => item.value === TOKEN_BALANCE_TYPE.USDC)].style
                    .background,
                marginRight: 5,
              }}
            >
              <BaseIconFont
                name="icon-USDC-white"
                style={redeemOptions[redeemOptions.findIndex(item => item.value === TOKEN_BALANCE_TYPE.USDC)].iconStyle}
              />
            </div>
            {TOKEN_BALANCE_TYPE.USDC}
          </div>
          <div style={{ height: 18, visibility: 'hidden' }} />
        </div>
      ) : (
        RanderOptions(
          redeemOptions.filter(item => item.value !== TOKEN_BALANCE_TYPE.USDT),
          redeemTokenType,
          redeemChange,
        )
      )}
    </BodyContent>
  );
}

export { MyCardContentOne, MyCardContentSecond };
