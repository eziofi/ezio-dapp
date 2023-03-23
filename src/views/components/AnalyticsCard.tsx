import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, SxProps, Theme } from '@mui/material';

import { useTranslation } from 'react-i18next';
import useWallet from '../hooks/useWallet';
import { commissionIncome, ezWETHReverse, getPooledA } from '../wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import { formatDecimal } from '../wallet/helpers/utilities';
import { NETWORK_TYPE, TOKEN_TYPE } from '../wallet/helpers/constant';
import { InlineSkeleton } from './Skeleton';

import USDCIconDark from '../../assets/analytics/usdc_dark.png';
import FeeValueIcon from '../../assets/analytics/feeValue.png';
import USDCIconLight from '../../assets/analytics/usdc_light.png';

const reverseCoinDark = {
  [NETWORK_TYPE.arbitrum]: require('../../assets/analytics/wstETH_dark.png'),
  [NETWORK_TYPE.polygon]: require('../../assets/analytics/stMatic_dark.png'),
}[process.env.REACT_APP_NETWORK as keyof typeof NETWORK_TYPE];

const reverseCoinLight = {
  [NETWORK_TYPE.arbitrum]: require('../../assets/analytics/wstETH_light.png'),
  [NETWORK_TYPE.polygon]: require('../../assets/analytics/stMatic_light.png'),
}[process.env.REACT_APP_NETWORK as keyof typeof NETWORK_TYPE];

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
  const { reverseCoin, networkId } = useWallet();

  const api = {
    [ANALYTICS_CARD_TYPE.USDC]: getPooledA,
    [ANALYTICS_CARD_TYPE.reverseCoin]: ezWETHReverse,
    [ANALYTICS_CARD_TYPE.FEE]: commissionIncome,
  };

  const title = {
    [ANALYTICS_CARD_TYPE.USDC]: t('analytics.title.usdc'),
    [ANALYTICS_CARD_TYPE.reverseCoin]: t(`analytics.title.${reverseCoin}`),
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
  const { data, isLoading } = useQuery(['AnalyticsCard', type], () => api[type](ethersProvider!.getSigner()), {
    enabled: !!ethersProvider,
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
  });

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
        <div style={{ width: 150, fontSize: 34, fontWeight: 700, display: 'flex', justifyItems: 'flex-start' }}>
          {!isLoading ? (
            type === ANALYTICS_CARD_TYPE.FEE ? (
              // @ts-ignore
              data
            ) : (
              data
            )
          ) : (
            <InlineSkeleton />
          )}
        </div>
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
        <img src={theme.palette.mode === 'dark' ? icon_Dark[type] : icon_light[type]} />

        {/*<Iconify icon={icon[type]} width={24} height={24} />*/}
      </StyledIcon>
    </Card>
  );
}
