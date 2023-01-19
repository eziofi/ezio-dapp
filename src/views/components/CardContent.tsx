import { InputBase, MenuItem, Select, SelectChangeEvent, styled, useTheme } from '@mui/material';
import React from 'react';
import { BalanceContent, BodyContent } from '../purchase/PurchaseStyle';
import { useTranslation } from 'react-i18next';
import { useBalance } from '../../hooks/useBalance';
import { formatNum } from '../../views/wallet/helpers/utilities';
import TextField from '@mui/material/TextField';
import { TOKEN_BALANCE_TYPE, TRANSFER_TYPE } from '../../views/wallet/helpers/constant';
import BaseIconFont from './BaseIconFont';

interface IProps {
  isBuy?: boolean;
  setIsBuy: (buy: boolean) => void;
  transactionType: TRANSFER_TYPE.PURCHASE | TRANSFER_TYPE.REDEEM;
  getTokenType: (tokenType: TOKEN_BALANCE_TYPE) => void;
  getInputVal1: (InputVal: string) => void | any;
  inputValue2: string;
  tokenType: TOKEN_BALANCE_TYPE;
}

type CardContentOneProps = Pick<IProps, 'transactionType' | 'getInputVal1' | 'getTokenType' | 'tokenType'>;
type CardContentSencoedProps = Pick<IProps, 'transactionType' | 'inputValue2' | 'getTokenType'>;

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 15,
    width: 110,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(247, 239, 255, 1)' : theme.palette.grey[700],
    // border: '1px solid #ced4da',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
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

      // borderRadius: 4,
      // borderColor: '#80bdff',
      // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
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
        fontSize: 40,
        width: 200,
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
        // textAlign: 'center',
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

function MyCardContentOne({ transactionType, getTokenType, getInputVal1, tokenType }: CardContentOneProps) {
  const { t } = useTranslation();

  const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (event: { target: { value: string } }) => {
    getTokenType(event.target.value as TOKEN_BALANCE_TYPE);
    SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };
  const { balance } = useBalance(
    transactionType === TRANSFER_TYPE.PURCHASE
      ? TOKEN_BALANCE_TYPE.USDT
      : currency === 'EZAT'
      ? TOKEN_BALANCE_TYPE.EZAT
      : TOKEN_BALANCE_TYPE.EZBT,
  );
  const theme = useTheme();

  return (
    <BodyContent>
      <CssTextField
        id="custom-css-outlined-input"
        size="small"
        placeholder="0"
        onChange={e => getInputVal1(e.target.value)}
        type="number"
      />
      {transactionType === TRANSFER_TYPE.PURCHASE ? (
        <BalanceContent>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 5 }}>
            <div
              style={{
                ...iconStyle,
                background: 'rgba(255, 87, 0, 1)',
                marginRight: 5,
              }}
            >
              <BaseIconFont name="icon-qiandaizi" style={{ width: 20, height: 20, fill: 'white' }} />
            </div>
            USDT
          </div>
          <span
            style={{
              fontSize: 12,
              color: theme.palette.text.secondary,
              marginTop: 5,
            }}
          >
            {t('purchase.leftBalance')}: {balance ? formatNum(balance).toUnsafeFloat().toFixed(2) : 0} USDT
          </span>
        </BalanceContent>
      ) : (
        <BalanceContent>
          <Select
            id="demo-customized-select-native"
            value={currency}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            {/*<MenuItem value="">*/}
            {/*  <em>None</em>*/}
            {/*</MenuItem>*/}
            <MenuItem value={TOKEN_BALANCE_TYPE.EZAT}>
              <>
                <div
                  style={{
                    ...iconStyle,
                    background: 'rgba(95, 69, 186, 1)',
                    margin: '0 10px',
                  }}
                >
                  <BaseIconFont name="icon-A" style={{ width: 20, height: 20, fill: 'white' }} />
                </div>
                EZAT
              </>
            </MenuItem>
            <MenuItem value={TOKEN_BALANCE_TYPE.EZBT}>
              <>
                <div
                  style={{
                    ...iconStyle,
                    background: 'rgba(26, 107, 173, 1)',
                    margin: '0 10px',
                  }}
                >
                  <BaseIconFont name="icon-B" style={{ width: 20, height: 20, fill: 'white' }} />
                </div>
                EZBT
              </>
            </MenuItem>
          </Select>
          <span
            style={{
              fontSize: 12,
              color: theme.palette.text.secondary,
              marginTop: 5,
            }}
          >
            {t('purchase.leftBalance')}: {balance ? formatNum(balance).toUnsafeFloat().toFixed(2) : 0} {tokenType}
          </span>
        </BalanceContent>
      )}
    </BodyContent>
  );
}

function MyCardContentSecond({ transactionType, getTokenType, inputValue2 }: CardContentSencoedProps) {
  const theme = useTheme();
  const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (event: SelectChangeEvent) => {
    getTokenType(event.target.value as TOKEN_BALANCE_TYPE);
    SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };

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
      <CssTextField
        id="custom-css-outlined-input"
        size="small"
        placeholder="0"
        // onChange={e => getInputVal2(e.target.value)}
        type="number"
        value={inputValue2}
      />
      {transactionType === TRANSFER_TYPE.PURCHASE ? (
        <BalanceContent>
          <Select
            id="demo-customized-select-native"
            value={currency}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            {/*<MenuItem value="">*/}
            {/*  <em>None</em>*/}
            {/*</MenuItem>*/}
            <MenuItem value={TOKEN_BALANCE_TYPE.EZAT}>
              <>
                <div
                  style={{
                    ...iconStyle,
                    margin: '0 10px',
                    background: 'rgba(26, 107, 173, 1)',
                  }}
                >
                  <BaseIconFont name="icon-A" style={{ width: 20, height: 20, fill: 'white' }} />
                </div>
                EZAT
              </>
            </MenuItem>
            <MenuItem value={TOKEN_BALANCE_TYPE.EZBT}>
              <>
                <div
                  style={{
                    ...iconStyle,
                    margin: '0 10px',
                    background: 'rgba(95, 69, 186, 1)',
                  }}
                >
                  <BaseIconFont name="icon-B" style={{ width: 20, height: 20, fill: 'white' }} />
                </div>
                EZBT
              </>
            </MenuItem>
          </Select>
          {/*<span*/}
          {/*  style={{*/}
          {/*    fontSize: 12,*/}
          {/*    color: theme.palette.text.secondary,*/}
          {/*    marginTop: 5,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {t('purchase.leftBalance')}: {balance ? formatNum(balance).toUnsafeFloat().toFixed(2) : 0} USDT*/}
          {/*</span>*/}
        </BalanceContent>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 5 }}>
          <div
            style={{
              ...iconStyle,
              background: 'rgba(255, 87, 0, 1)',
              marginRight: 5,
            }}
          >
            <BaseIconFont name="icon-qiandaizi" style={{ width: 20, height: 20, fill: 'white' }} />
          </div>
          USDT
        </div>
      )}
    </BodyContent>
  );
}

export { MyCardContentOne, MyCardContentSecond };
