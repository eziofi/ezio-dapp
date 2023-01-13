import { Dispatch, SetStateAction, useState } from 'react';
import useWallet from '../views/hooks/useWallet';
import { TOKEN_BALANCE_TYPE, TOKEN_TYPE, TRANSFER_TYPE } from '../views/wallet/helpers/constant';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Signer } from 'ethers';
import { purchase, redeem, treasuryInterestRate } from '../views/wallet/helpers/contract_call';
import { formatNetWorth, formatNum, timestampFormat } from '../views/wallet/helpers/utilities';
import { useTranslation } from 'react-i18next';
import { Button, Link, Snackbar, TextField } from '@mui/material';
import styles from './TransactionForm.module.less';
import { useBalance } from '../hooks/useBalance';
import { useNetWorth } from '../hooks/useNetWorth';

interface IPurchaseArg {
  type: TOKEN_TYPE;
  tokenQty: number;
  signerOrProvider: Signer;
}
export function TransactionForm({
  transactionType,
  tokenType,
  setTipDrawerOpened,
}: {
  transactionType: TRANSFER_TYPE.PURCHASE | TRANSFER_TYPE.REDEEM;
  tokenType: TOKEN_TYPE;
  setTipDrawerOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const [inputValue, setInputValue] = useState('');
  const { ethersProvider, account } = useWallet();
  const { t } = useTranslation();
  const queryClient: QueryClient = useQueryClient();

  const { mutate: purchaseMutate } = useMutation(
    (arg: IPurchaseArg) => purchase(arg.type, arg.tokenQty, arg.signerOrProvider),
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
    (arg: IPurchaseArg) => redeem(arg.type, arg.tokenQty, arg.signerOrProvider),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: error => {
        console.error(error);
      },
    },
  );

  const { data: rate } = useQuery(['EZATrate'], () => treasuryInterestRate(ethersProvider!.getSigner()), {
    // onSuccess: data => {
    //   const res = formatNetWorth(data);
    //   debugger;
    // },
  });

  const { netWorth } = useNetWorth(tokenType);

  const { balance, refetchBalance } = useBalance(
    transactionType === TRANSFER_TYPE.PURCHASE
      ? TOKEN_BALANCE_TYPE.USDT
      : tokenType === 0
      ? TOKEN_BALANCE_TYPE.EZAT
      : TOKEN_BALANCE_TYPE.EZBT,
  );

  const [msgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const doPurchase = () => {
    refetchBalance().then(data => {
      const balance = formatNum(data.data).toUnsafeFloat();

      if (parseInt(inputValue) > balance) {
        setMsg(t('purchase.moreThanBalanceMsg'));
        setMsgOpen(true);
      } else {
        const args: IPurchaseArg = {
          type: tokenType,
          tokenQty: parseInt(inputValue),
          signerOrProvider: ethersProvider!.getSigner(),
        };
        purchaseMutate(args);
        setInputValue('');
      }
    });
  };

  const doRedeem = () => {
    refetchBalance().then(data => {
      const balance = formatNum(data.data).toUnsafeFloat();

      if (parseInt(inputValue) > balance) {
        setMsg(t('redeem.moreThanBalanceMsg'));
        setMsgOpen(true);
      } else {
        const args: IPurchaseArg = {
          type: tokenType,
          tokenQty: parseInt(inputValue),
          signerOrProvider: ethersProvider!.getSigner(),
        };
        redeemMutate(args);
        setInputValue('');
      }
    });
  };

  const setValue = (value: string) => {
    let numberValue = value.replace(/[^0-9]/g, '');
    setInputValue(numberValue);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={msgOpen}
        onClose={() => setMsgOpen(false)}
        message={msg}
      />
      <div className={styles.transactionBox}>
        <div className={styles.transactionFormBox}>
          <div>
            {transactionType === TRANSFER_TYPE.PURCHASE ? t('purchase.purchaseValue') : t('redeem.redeemValue')}:
          </div>
          <div className={styles.transactionForm}>
            <TextField
              size="small"
              type="number"
              variant="standard"
              value={inputValue}
              sx={{ textAlign: 'right', width: '100px' }}
              onChange={e => setValue(e.target.value)}
            />
            {/*<div>00</div>*/}
            <div className={styles.divider} />
            {transactionType === TRANSFER_TYPE.PURCHASE && <div className={styles.usdtText}>USDT</div>}
            {transactionType === TRANSFER_TYPE.REDEEM && (
              <div className={styles.usdtText}>{tokenType === 0 ? 'EZAT' : 'EZBT'}</div>
            )}
          </div>
        </div>
        {transactionType === TRANSFER_TYPE.PURCHASE && (
          <div className={styles.balance}>
            {t('purchase.leftBalance')}: {balance ? formatNum(balance).toUnsafeFloat().toFixed(2) : 0} USDT
          </div>
        )}
        {transactionType === TRANSFER_TYPE.REDEEM && (
          <div className={styles.balance}>
            {t('redeem.maxRedeemAmount')}: {balance ? formatNum(balance).toUnsafeFloat().toFixed(2) : 0}
            {tokenType === 0 ? ' EZAT' : ' EZBT'}
          </div>
        )}
        <div className={styles.timeBox}>
          {t('purchase.currentTime')}: {timestampFormat(new Date().getTime())}
        </div>
        {transactionType === TRANSFER_TYPE.PURCHASE && (
          <Button
            variant="contained"
            disableElevation
            sx={{ width: '100%' }}
            onClick={doPurchase} // 购买
            disabled={!inputValue || !parseInt(inputValue)}
          >
            {t('purchase.purchaseAction')}
          </Button>
        )}
        {transactionType === TRANSFER_TYPE.REDEEM && (
          <Button
            variant="contained"
            disableElevation
            sx={{ width: '100%' }}
            onClick={doRedeem} //赎回
            disabled={!inputValue || !parseInt(inputValue)}
          >
            {t('redeem.redeemAction')}
          </Button>
        )}
        <div className={styles.tipsBox}>
          <Link href="#" className={styles.linkText} underline="none" onClick={() => setTipDrawerOpened(true)}>
            {t('purchase.checkTips')}
          </Link>
          {/*<div className={styles.tipText}>{t('purchase.rewardTips')}</div>*/}
          <div className={styles.tipText}>{t('purchase.unitPrice') + ' $' + formatNetWorth(netWorth, true)}</div>
          <div className={styles.tipText}>
            {t('purchase.USDTEstimated')}
            &nbsp;
            {inputValue
              ? transactionType === TRANSFER_TYPE.PURCHASE
                ? Math.floor(parseInt(inputValue) / parseFloat(formatNetWorth(netWorth, true)))
                : Math.floor(parseInt(inputValue) * parseFloat(formatNetWorth(netWorth, true)))
              : 0}
            &nbsp;
            {transactionType === TRANSFER_TYPE.PURCHASE ? (tokenType === 0 ? 'EZAT' : 'EZBT') : 'USDT'}
          </div>
          {transactionType === TRANSFER_TYPE.PURCHASE && (
            <div className={styles.tipText}>
              {t('purchase.EZATRate')} {(rate ? (parseFloat(formatNetWorth(rate)) / 10000).toFixed(2) : 0) + ' ‱'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
