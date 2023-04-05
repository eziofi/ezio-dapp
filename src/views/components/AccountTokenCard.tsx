import { ATokenMap, TOKEN_TYPE } from '../wallet/helpers/constant';
import { useBalance } from '../../hooks/useBalance';
import { usePrice } from '../../hooks/usePrice';
import { AccountCard, Content } from '../account/AccountStyle';
import BaseIconFont from './BaseIconFont';
import { formatString } from '../wallet/helpers/utilities';
import { InlineSkeleton } from './Skeleton';
import { useTranslation } from 'react-i18next';
import { Box, Tooltip, useTheme } from '@mui/material';
import { useEffect } from 'react';
import useWallet from '../hooks/useWallet';

export default function AccountTokenCard({ type, refreshFlag }: { type: TOKEN_TYPE; refreshFlag: number }) {
  const { balance, refetchBalance, isBalanceFetching } = useBalance(type);
  const { price, refetchPrice, isPriceFetching } = usePrice(type);
  const { t } = useTranslation();
  const { reverseCoin, networkName } = useWallet();

  useEffect(() => {
    if (refreshFlag > 0) {
      refetchBalance();
      refetchPrice();
    }
  }, [refreshFlag]);

  const calcValue = (price: string | undefined, balance: string | undefined) => {
    if (price && balance) {
      return (parseFloat(price) * parseFloat(balance)).toFixed(2);
    } else {
      return 0;
    }
  };
  // 总价值
  const value = calcValue(price, balance);

  const iconDiv = {
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  };

  const IconStyle = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    opacity: 1,
    fill: 'white',
  };

  const IconNames = {
    [TOKEN_TYPE.USDT]: 'icon-usdt',
    [TOKEN_TYPE.USDC]: 'icon-usdc',
    [TOKEN_TYPE.ReverseCoin]: `icon-${reverseCoin}1`,
    [TOKEN_TYPE.USDE]: 'icon-USDE1',
    [TOKEN_TYPE.E2LP]: 'icon-E2LP',
  };

  const iconDibBgColor = {
    [TOKEN_TYPE.USDE]: 'rgba(95, 69, 186, 1)',
    [TOKEN_TYPE.E2LP]: 'rgba(239, 89, 114, 1)',
  };

  const theme = useTheme();

  return (
    <AccountCard>
      <Content>
        <>
          <div
            style={{
              ...iconDiv,
              // @ts-ignore
              background: iconDibBgColor[type],
            }}
          >
            <BaseIconFont
              name={IconNames[type]}
              style={
                type === TOKEN_TYPE.USDE || type === TOKEN_TYPE.E2LP
                  ? {
                      ...IconStyle,
                    }
                  : {}
              }
            />
          </div>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <div style={{ fontSize: 20 }}>
                {type === TOKEN_TYPE.ReverseCoin
                  ? reverseCoin
                  : type === TOKEN_TYPE.E2LP
                  ? networkName
                    ? ATokenMap[networkName]
                    : ''
                  : TOKEN_TYPE[type]}
              </div>
              {!isBalanceFetching || !isPriceFetching ? (
                <div style={{ fontSize: 12, color: theme.palette.text.disabled }}>
                  {t('account.netWorth')}: {value} USDC
                </div>
              ) : (
                <InlineSkeleton width={70} />
              )}
            </Box>
            <div>
              {!isBalanceFetching ? (
                <Tooltip title={balance} placement="top">
                  <div style={{ fontSize: 28, color: 'rgba(67, 207, 124, 1)' }}>
                    {formatString(balance || '0', 6).toString()}
                  </div>
                </Tooltip>
              ) : (
                <InlineSkeleton width={70} />
              )}
            </div>
          </Box>
        </>
      </Content>
    </AccountCard>
  );
}
