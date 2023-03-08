import { TOKEN_TYPE } from '../wallet/helpers/constant';
import { useBalance } from '../../hooks/useBalance';
import { usePrice } from '../../hooks/usePrice';
import { AccountCard, Content } from '../account/AccountStyle';
import BaseIconFont from './BaseIconFont';
import { formatDecimal } from '../wallet/helpers/utilities';
import { InlineSkeleton } from './Skeleton';
import { useTranslation } from 'react-i18next';
import { Box, Tooltip } from '@mui/material';
import { useEffect } from 'react';

export default function AccountTokenCard({ type, refreshFlag }: { type: TOKEN_TYPE; refreshFlag: number }) {
  const { balance, refetchBalance, isLoading } = useBalance(type);
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
    width: 30,
    height: 30,
    borderRadius: '50%',
    opacity: 1,
    fill: 'white',
  };

  return (
    <AccountCard>
      <Content>
        {type === TOKEN_TYPE.USDT || type === TOKEN_TYPE.USDC || type === TOKEN_TYPE.stMATIC ? (
          <>
            {/* icon */}
            {/* <Box sx={{ width: 50, height: 50, borderRadius: '50%', background: 'pink', marginRight: 2 }} /> */}
            <div
              style={{
                ...iconDiv,
                // background:
                //   type === TOKEN_TYPE.USDT
                //     ? 'rgba(50, 177, 108)'
                //     : type === TOKEN_TYPE.USDC
                //     ? 'rgba(60, 193, 200)'
                //     : 'rgba(239, 89, 114)',
              }}
            >
              <BaseIconFont
                name={type === TOKEN_TYPE.USDT ? 'icon-usdt' : type === TOKEN_TYPE.USDC ? 'icon-usdc' : 'icon-stMatic1'}
                // style={{ ...IconStyle }}
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
                  <Tooltip title={formatDecimal(balance, type, 6).toString()} placement="top">
                    <div style={{ fontSize: 28, color: 'rgba(67, 207, 124, 1)' }}>
                      {formatDecimal(balance, type).toString()}
                    </div>
                  </Tooltip>
                ) : (
                  <InlineSkeleton width={70} />
                )}
              </div>
            </Box>
          </>
        ) : (
          <>
            {/* icon */}
            {/* <Box sx={{ width: 50, height: 50, borderRadius: '50%', background: 'pink', marginRight: 2 }} /> */}
            <div
              style={{
                ...iconDiv,
                background: type === TOKEN_TYPE.ezUSD ? 'rgba(95, 69, 186, 1)' : 'rgba(239, 89, 114, 1)',
              }}
            >
              <BaseIconFont
                name={type === TOKEN_TYPE.ezUSD ? 'icon-A' : 'icon-B'}
                style={{
                  ...IconStyle,
                }}
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
                  <Tooltip title={formatDecimal(balance, type, 18).toString()} placement="top">
                    <div style={{ fontSize: 28, color: 'rgba(67, 207, 124, 1)' }}>
                      {formatDecimal(balance, type).toString()}
                    </div>
                  </Tooltip>
                ) : (
                  <InlineSkeleton width={70} />
                )}
              </div>
            </Box>
          </>
        )}
      </Content>
    </AccountCard>
  );
}
