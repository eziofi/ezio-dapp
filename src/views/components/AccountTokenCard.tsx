import { TOKEN_TYPE } from '../wallet/helpers/constant';
import { useBalance } from '../../hooks/useBalance';
import { usePrice } from '../../hooks/usePrice';
import { AccountCard, Content } from '../account/AccountStyle';
import BaseIconFont from './BaseIconFont';
import { formatDecimal, formatString } from '../wallet/helpers/utilities';
import { InlineSkeleton } from './Skeleton';
import { useTranslation } from 'react-i18next';
import { Box, Tooltip } from '@mui/material';
import { useEffect } from 'react';

export default function AccountTokenCard({ type, refreshFlag }: { type: TOKEN_TYPE; refreshFlag: number }) {
  const { balance, refetchBalance } = useBalance(type);
  const { price, refetchPrice } = usePrice(type);
  const { t } = useTranslation();

  useEffect(() => {
    if (refreshFlag > 0) {
      refetchBalance();
      refetchPrice();
    }
  }, [refreshFlag]);

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
    [TOKEN_TYPE.stMATIC]: 'icon-stMatic1',
    [TOKEN_TYPE.ezUSD]: 'icon-A',
    [TOKEN_TYPE.ezMATIC]: 'icon-B',
  };

  return (
    <AccountCard>
      <Content>
        <>
          <div
            style={{
              ...iconDiv,
              background:
                type === TOKEN_TYPE.ezUSD
                  ? 'rgba(95, 69, 186, 1)'
                  : type === TOKEN_TYPE.ezMATIC
                  ? 'rgba(239, 89, 114, 1)'
                  : 'none',
            }}
          >
            <BaseIconFont
              name={IconNames[type]}
              style={
                type === TOKEN_TYPE.ezUSD || type === TOKEN_TYPE.ezMATIC
                  ? {
                      ...IconStyle,
                    }
                  : {}
              }
            />
          </div>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <div style={{ fontSize: 20 }}>{TOKEN_TYPE[type]}</div>
              {price ? (
                <div style={{ fontSize: 12, color: 'rgba(76, 80, 97, 1)' }}>
                  {t('account.netWorth')}: {price} USDC
                </div>
              ) : (
                <InlineSkeleton width={70} />
              )}
            </Box>
            <div>
              {balance ? (
                <Tooltip title={balance} placement="top">
                  <div style={{ fontSize: 28, color: 'rgba(67, 207, 124, 1)' }}>{formatString(balance).toString()}</div>
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
