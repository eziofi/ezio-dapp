import { CardContent, Select, MenuItem, Input, SelectChangeEvent, styled, useTheme } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { BalanceContent, BodyContent, FormControlStyle } from '../purchase/PurchaseStyle';
import { useTranslation } from 'react-i18next';
import { useBalance } from '../../hooks/useBalance';
import { formatNetWorth, formatNum, timestampFormat } from '../../views/wallet/helpers/utilities';
import TextField from '@mui/material/TextField';

interface IProps {
  isBuy?: boolean;
  setIsBuy: (buy: boolean) => void;
  transactionType: TRANSFER_TYPE.PURCHASE | TRANSFER_TYPE.REDEEM;
  getTokenType: (tokenType: TOKEN_BALANCE_TYPE) => void;
  getInputVal1: (InputVal: string) => void | any;
  getInputVal2: (InputVal: string) => void;
}

type CardContentOneProps = Pick<IProps, 'transactionType' | 'getInputVal1' | 'getTokenType'>;
type CardContentSencoedProps = Pick<IProps, 'transactionType' | 'getInputVal2' | 'getTokenType'>;

import { TOKEN_BALANCE_TYPE, TOKEN_TYPE, TRANSFER_TYPE } from '../../views/wallet/helpers/constant';

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
        width: 100,
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
        textAlign: 'center',
        padding: 0,
      },
    },
  };
});
function MyCardContentOne({ transactionType, getTokenType, getInputVal1 }: CardContentOneProps) {
  const { t } = useTranslation();

  const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (event: SelectChangeEvent) => {
    getTokenType(event.target.value as TOKEN_BALANCE_TYPE);
    SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };
  const { balance, refetchBalance } = useBalance(
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
          <FormControlStyle sx={{ mb: 1 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={currency}
              onChange={handleChange}
              label="Age"
              sx={{
                background: theme.palette.background.paper,
                color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={TOKEN_BALANCE_TYPE.EZAT}>EZAT</MenuItem>
              <MenuItem value={TOKEN_BALANCE_TYPE.EZBT}>EZBT</MenuItem>
            </Select>
          </FormControlStyle>
          <span
            style={{
              fontSize: 12,
              color: theme.palette.text.secondary,
            }}
          >
            {t('purchase.leftBalance')}: {balance ? formatNum(balance).toUnsafeFloat().toFixed(2) : 0} USDT
          </span>
        </BalanceContent>
      ) : (
        <span>USDT</span>
      )}
    </BodyContent>
  );
}

function MyCardContentSecond({ transactionType, getTokenType, getInputVal2 }: CardContentSencoedProps) {
  const theme = useTheme();
  const [currency, SetCurrency] = React.useState(TOKEN_BALANCE_TYPE.EZAT);
  const handleChange = (event: SelectChangeEvent) => {
    getTokenType(event.target.value as TOKEN_BALANCE_TYPE);
    SetCurrency(event.target.value as TOKEN_BALANCE_TYPE);
  };

  const { t } = useTranslation();
  const { balance, refetchBalance } = useBalance(
    transactionType === TRANSFER_TYPE.PURCHASE
      ? TOKEN_BALANCE_TYPE.USDT
      : currency === 'EZAT'
      ? TOKEN_BALANCE_TYPE.EZAT
      : TOKEN_BALANCE_TYPE.EZBT,
  );

  return (
    <BodyContent>
      <CssTextField
        id="custom-css-outlined-input"
        size="small"
        placeholder="0"
        onChange={e => getInputVal2(e.target.value)}
        type="number"
      />
      {transactionType === TRANSFER_TYPE.PURCHASE ? (
        <span>USDT</span>
      ) : (
        <BalanceContent>
          <FormControlStyle sx={{ mb: 1 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={currency}
              onChange={handleChange}
              label="Age"
              sx={{
                background: theme.palette.background.paper,
                color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={TOKEN_BALANCE_TYPE.EZAT}>EZAT</MenuItem>
              <MenuItem value={TOKEN_BALANCE_TYPE.EZBT}>EZBT</MenuItem>
            </Select>
          </FormControlStyle>
          <span
            style={{
              fontSize: 12,
              color: theme.palette.text.secondary,
            }}
          >
            {t('purchase.leftBalance')}: {balance ? formatNum(balance).toUnsafeFloat().toFixed(2) : 0} USDT
          </span>
        </BalanceContent>
      )}
    </BodyContent>
  );
}

export { MyCardContentOne, MyCardContentSecond };
