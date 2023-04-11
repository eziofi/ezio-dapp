import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, SxProps, Theme, Tooltip } from '@mui/material';

import { useTranslation } from 'react-i18next';
import useWallet from '../../hooks/useWallet';
import { commissionIncome, ezWETHReverse, getPooledA } from '../wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import { NETWORK_TYPE } from '../wallet/helpers/constant';
import { InlineSkeleton } from './Skeleton';

import USDCIconDark from '../../assets/analytics/usdc_dark.png';
import FeeValueIcon from '../../assets/analytics/feeValue.png';
import USDCIconLight from '../../assets/analytics/usdc_light.png';
import { formatString } from '../wallet/helpers/utilities';
import { CustomTooltip } from './HomeCard';

const reverseCoinDark = {
  [NETWORK_TYPE.arbitrum]: require('../../assets/analytics/wstETH_dark.png'),
  [NETWORK_TYPE.polygon]: require('../../assets/analytics/stMatic_dark.png'),
};

const reverseCoinLight = {
  [NETWORK_TYPE.arbitrum]: require('../../assets/analytics/wstETH_light.png'),
  [NETWORK_TYPE.polygon]: require('../../assets/analytics/stMatic_light.png'),
};

const StyledIcon = styled('div')(({ theme }) => ({
  // margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  // alignItems: 'center',
  width: theme.spacing(12),
  height: theme.spacing(12),
  justifyContent: 'center',
  // marginBottom: theme.spacing(3),
  marginRight: theme.spacing(4),
}));

export enum ANALYTICS_CARD_TYPE {
  USDC,
  reverseCoin,
  FEE,
}
export default function AnalyticsCard({
  type,
  color = 'primary',
  sx,
  ...other
}: {
  type: ANALYTICS_CARD_TYPE;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  sx?: SxProps<Theme>;
}) {
  const { t } = useTranslation();
  const { ethersProvider } = useWallet();

  const theme = useTheme();
  const { reverseCoin, networkName, account } = useWallet();

  const api = {
    [ANALYTICS_CARD_TYPE.USDC]: getPooledA,
    [ANALYTICS_CARD_TYPE.reverseCoin]: ezWETHReverse,
    [ANALYTICS_CARD_TYPE.FEE]: commissionIncome,
  };

  const title = {
    [ANALYTICS_CARD_TYPE.USDC]: t('analytics.title.usdc'),
    [ANALYTICS_CARD_TYPE.reverseCoin]: reverseCoin ? t(`analytics.title.${reverseCoin}`) : '',
    [ANALYTICS_CARD_TYPE.FEE]: t('analytics.title.fee'),
  };

  // 深色
  const icon_Dark = {
    [ANALYTICS_CARD_TYPE.USDC]: USDCIconDark,
    [ANALYTICS_CARD_TYPE.reverseCoin]: reverseCoinDark,
    [ANALYTICS_CARD_TYPE.FEE]: FeeValueIcon,
  };

  // 浅色
  const icon_light = {
    [ANALYTICS_CARD_TYPE.USDC]: USDCIconLight,
    [ANALYTICS_CARD_TYPE.reverseCoin]: reverseCoinLight,
    [ANALYTICS_CARD_TYPE.FEE]: FeeValueIcon,
  };

  const { data } = useQuery(
    ['AnalyticsCard', type],
    () => {
      return type === ANALYTICS_CARD_TYPE.FEE
        ? api[type](networkName as NETWORK_TYPE)
        : api[type](ethersProvider!.getSigner(), networkName as NETWORK_TYPE);
    },
    {
      enabled: !!ethersProvider && !!networkName,
    },
  );

  if (type === ANALYTICS_CARD_TYPE.FEE) {
    const der = data?.toUnsafeFloat();
  }

  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        // textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        // @ts-ignore
        // color: theme => theme.palette[color][theme.palette.mode === 'light' ? 'darker' : 'lighter'],
        // @ts-ignore
        // bgcolor: theme => theme.palette[color][theme.palette.mode === 'light' ? 'lighter' : 'darker'],
        ...sx,
      }}
      {...other}
    >
      <Box style={{ display: 'flex', flexDirection: 'column', marginLeft: theme.spacing(4) }}>
        {type === ANALYTICS_CARD_TYPE.FEE ? (
          <div style={{ width: 150, fontSize: 34, fontWeight: 700, display: 'flex', justifyItems: 'flex-start' }}>
            {data ? '$' + data.toString() : <InlineSkeleton />}
          </div>
        ) : (
          <div style={{ width: 150, fontSize: 34, fontWeight: 700, display: 'flex', justifyItems: 'flex-start' }}>
            {data ? (
              <>
                {/*<div style={{width: 150, fontSize: 34, fontWeight: 700, display: 'flex', justifyItems: 'flex-start'}}>*/}
                {/*  {formatString(data || '0', 6).toString()}*/}
                {/*</div>*/}
                <CustomTooltip title={data.toString()} placement="top-start">
                  <div
                    style={{ width: 150, fontSize: 34, fontWeight: 700, display: 'flex', justifyItems: 'flex-start' }}
                  >
                    {formatString(data || '0', 6).toString()}
                  </div>
                </CustomTooltip>
              </>
            ) : (
              <InlineSkeleton />
            )}
          </div>
        )}
        <div
          style={{
            opacity: 0.72,
            fontSize: 14,
            marginTop: '5px',
            display: 'flex',
            justifyItems: 'flex-start',
          }}
        >
          {title[type]}
        </div>
      </Box>
      <StyledIcon>
        <img
          src={
            theme.palette.mode === 'dark'
              ? type === ANALYTICS_CARD_TYPE.reverseCoin
                ? icon_Dark[type][networkName || NETWORK_TYPE.arbitrum]
                : icon_Dark[type]
              : type === ANALYTICS_CARD_TYPE.reverseCoin
              ? icon_light[type][networkName || NETWORK_TYPE.arbitrum]
              : icon_light[type]
          }
        />
      </StyledIcon>
    </Card>
  );
}
