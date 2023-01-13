import { CardContent, Select, MenuItem, Input, SelectChangeEvent } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { BalanceContent, BodyContent, FormControlStyle } from '../purchase/PurchaseStyle';
import { useTranslation } from 'react-i18next';
import { useBalance } from '../../hooks/useBalance';
import { formatNetWorth, formatNum, timestampFormat } from '../../views/wallet/helpers/utilities';

interface IProps {
  isBuy?: boolean;
  setIsBuy: (buy: boolean) => void;
  transactionType: TRANSFER_TYPE.PURCHASE | TRANSFER_TYPE.REDEEM;
  tokenType?: TOKEN_TYPE;
  getInputVal1: (InputVal: string) => void | any;
  getInputVal2: (InputVal: string) => void;
}

type CardContentOneProps = Pick<IProps, 'transactionType' | 'tokenType' | 'getInputVal1'>;
type CardContentSencoedProps = Pick<IProps, 'transactionType' | 'tokenType' | 'getInputVal2'>;

import { TOKEN_BALANCE_TYPE, TOKEN_TYPE, TRANSFER_TYPE } from '../../views/wallet/helpers/constant';
function MyCardContentOne({ transactionType, tokenType, getInputVal1 }: CardContentOneProps) {
  const { t } = useTranslation();
  const { balance, refetchBalance } = useBalance(
    transactionType === TRANSFER_TYPE.PURCHASE
      ? TOKEN_BALANCE_TYPE.USDT
      : tokenType === 0
      ? TOKEN_BALANCE_TYPE.EZAT
      : TOKEN_BALANCE_TYPE.EZBT,
  );
  const [currency, SetCurrency] = React.useState('EZBT');
  const handleChange = (event: SelectChangeEvent) => {
    SetCurrency(event.target.value as string);
  };

  return (
    <BodyContent>
      <Input
        size="small"
        sx={{ fontSize: 40, width: 100, color: 'rgba(191, 191, 191, 1)', textAlign: 'center' }}
        onChange={e => {
          getInputVal1(e.target.value);
        }}
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
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="EZBT">EZBT</MenuItem>
            </Select>
          </FormControlStyle>
          <span style={{ fontSize: 12, color: 'rgba(76, 80, 97, 1)' }}>
            {t('purchase.leftBalance')}: {balance ? formatNum(balance).toUnsafeFloat().toFixed(2) : 0} USDT
          </span>
        </BalanceContent>
      ) : (
        <span>USDT</span>
      )}
    </BodyContent>
  );
}

function MyCardContentSencoed({ transactionType, tokenType, getInputVal2 }: CardContentSencoedProps) {
  const [currency, SetCurrency] = React.useState('EZBT');
  const handleChange = (event: SelectChangeEvent) => {
    SetCurrency(event.target.value as string);
  };

  const { t } = useTranslation();
  const { balance, refetchBalance } = useBalance(
    transactionType === TRANSFER_TYPE.PURCHASE
      ? TOKEN_BALANCE_TYPE.USDT
      : tokenType === 0
      ? TOKEN_BALANCE_TYPE.EZAT
      : TOKEN_BALANCE_TYPE.EZBT,
  );

  return (
    <BodyContent>
      <Input
        size="small"
        sx={{ fontSize: 40, width: 100, color: 'rgba(191, 191, 191, 1)', textAlign: 'center' }}
        onChange={e => getInputVal2(e.target.value)}
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
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="EZBT">EZBT</MenuItem>
            </Select>
          </FormControlStyle>
          <span style={{ fontSize: 12, color: 'rgba(76, 80, 97, 1)' }}>
            {t('purchase.leftBalance')}: {balance ? formatNum(balance).toUnsafeFloat().toFixed(2) : 0} USDT
          </span>
        </BalanceContent>
      )}
    </BodyContent>
  );
}

export { MyCardContentOne, MyCardContentSencoed };
