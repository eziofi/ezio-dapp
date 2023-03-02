import { TOKEN_TYPE } from '../wallet/helpers/constant';
import { useBalance } from '../../hooks/useBalance';
import { usePrice } from '../../hooks/usePrice';
import { AccountCard, Content } from '../account/AccountStyle';
import BaseIconFont from './BaseIconFont';
import Box from '@mui/material/Box';
import { formatDecimal } from '../wallet/helpers/utilities';
import { InlineSkeleton } from './Skeleton';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';

export default function AccountTokenCard({ type }: { type: TOKEN_TYPE }) {
  const { balance } = useBalance(type);
  const { netWorth } = usePrice(type);
  const { t } = useTranslation();

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
        {type === TOKEN_TYPE.USDT || type === TOKEN_TYPE.USDC || type === TOKEN_TYPE.stMatic ? (
          <>
            {/* icon */}
            {/* <Box sx={{ width: 50, height: 50, borderRadius: '50%', background: 'pink', marginRight: 2 }} /> */}
            <div
              style={{
                ...iconDiv,
                background:
                  type === TOKEN_TYPE.USDT
                    ? 'rgba(50, 177, 108)'
                    : type === TOKEN_TYPE.USDC
                    ? 'rgba(60, 193, 200)'
                    : 'rgba(239, 89, 114)',
              }}
            >
              <BaseIconFont
                name={
                  type === TOKEN_TYPE.USDT
                    ? 'icon-USDT-white'
                    : type === TOKEN_TYPE.USDC
                    ? 'icon-USDC-white'
                    : 'icon-stMatic-white'
                }
                style={{ ...IconStyle }}
              />
            </div>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <div style={{ fontSize: 20 }}>{TOKEN_TYPE[type]}</div>
                {netWorth ? (
                  <div style={{ fontSize: 12, color: 'rgba(76, 80, 97, 1)' }}>
                    {t('account.netWorth')}: {formatDecimal(netWorth, type, 6).toString()} USDC
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
                background: type === TOKEN_TYPE.ezUSD ? 'rgba(95, 69, 186, 1)' : 'rgba(26, 107, 173, 1)',
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
                {netWorth ? (
                  <div style={{ fontSize: 12, color: 'rgba(76, 80, 97, 1)' }}>
                    {t('account.netWorth')}: {formatDecimal(netWorth, TOKEN_TYPE.USDC, 6).toString()} USDC
                    {/*{netWorth.toString()} USDC*/}
                  </div>
                ) : (
                  <InlineSkeleton width={70} />
                )}
              </Box>
              <div>
                {balance ? (
                  <Tooltip title={formatDecimal(balance, type, 18).toString()} placement="top">
                    <div style={{ fontSize: 28, color: 'rgba(67, 207, 124, 1)' }}>
                      {/*{formatNum(balance, type).toUnsafeFloat().toFixed(2)}*/}
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
