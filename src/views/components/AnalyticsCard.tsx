import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, SxProps, Theme, Tooltip } from '@mui/material';

import { useTranslation } from 'react-i18next';
import useWallet from '../hooks/useWallet';
import {
  commissionIncome,
  ezWETHReverse,
  getPooledA,
  reverseCoinBalanceOf,
  usdcBalanceOf,
} from '../wallet/helpers/contract_call';
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

  // @ts-ignore
  const { data } = useQuery(
    ['AnalyticsCard', type],
    () => {
      return type === ANALYTICS_CARD_TYPE.FEE
        ? api[type](networkName as NETWORK_TYPE)
        : api[type](ethersProvider!.getSigner(), networkName as NETWORK_TYPE);
    },
    {
      enabled: !!ethersProvider && !!networkName,
      // @ts-ignore
      onSuccess: data1 => {
        // if (type === ANALYSIS_CARD_TYPE.rate) {
        //   const res = formatNetWorth(data1);
        //   debugger;
        // }
      },
      onError: err => {
        // debugger;
      },
    },
  );

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
            {data !== undefined ? '$' + data : <InlineSkeleton />}
          </div>
        ) : (
          <div style={{ width: 150, fontSize: 34, fontWeight: 700, display: 'flex', justifyItems: 'flex-start' }}>
            {data ? (
              <CustomTooltip title={data} placement="top-start">
                <div style={{ width: 150, fontSize: 34, fontWeight: 700, display: 'flex', justifyItems: 'flex-start' }}>
                  {formatString(data || '0', 6).toString()}
                </div>
              </CustomTooltip>
            ) : (
              // <div style={{ width: 150, fontSize: 34, fontWeight: 700, display: 'flex', justifyItems: 'flex-start' }}>
              //   {formatString(data || '0', 6).toString()}
              // </div>
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
      <StyledIcon
      // sx={{
      //   // color: theme => theme.palette[color][theme.palette.mode === 'light' ? 'dark' : 'light'],
      //   backgroundImage: theme =>
      //     `linear-gradient(${theme.palette.mode === 'light' ? '135deg' : '-45deg'}, ${alpha(
      //       theme.palette[color][theme.palette.mode === 'light' ? 'dark' : 'light'],
      //       0,
      //     )} 0%, ${alpha(theme.palette[color][theme.palette.mode === 'light' ? 'dark' : 'light'], 0.24)} 100%)`,
      // }}
      >
        {/* <BaseIconFont
          name={icon[type]}
          style={{
            width: 22,
            height: 22,
            // @ts-ignore
            fill: theme.palette[color][theme.palette.mode === 'light' ? 'darker' : 'lighter'],
          }}
        /> */}
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

        {/*<Iconify icon={icon[type]} width={24} height={24} />*/}
      </StyledIcon>
    </Card>
  );
}
