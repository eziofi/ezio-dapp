import { alpha, styled, useTheme } from '@mui/material/styles';
import { Card, SxProps, Theme, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import useWallet from '../hooks/useWallet';
import {
  ezatTotalSupply,
  ezbtTotalSupply,
  ezMATICTotalNetWorth,
  ezUSDTotalNetWorth,
  treasuryInterestRate,
  treasuryTotalNetWorth,
} from '../wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import { formatNetWorth, formatDecimal } from '../wallet/helpers/utilities';
import BaseIconFont from './BaseIconFont';
import { TOKEN_TYPE } from '../wallet/helpers/constant';
import { InlineSkeleton } from './Skeleton';

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

export enum ANALYTICS_CARD_TYPE {
  USDC,
  stMATIC,
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

  const api = {
    [ANALYTICS_CARD_TYPE.USDC]: ezUSDTotalNetWorth,
    [ANALYTICS_CARD_TYPE.stMATIC]: ezMATICTotalNetWorth,
    [ANALYTICS_CARD_TYPE.FEE]: ezMATICTotalNetWorth,
  };
  const title = {
    [ANALYTICS_CARD_TYPE.USDC]: t('analytics.title.usdc'),
    [ANALYTICS_CARD_TYPE.stMATIC]: t('analytics.title.stMATIC'),
    [ANALYTICS_CARD_TYPE.FEE]: t('analytics.title.fee'),
  };
  const icon = {
    [ANALYTICS_CARD_TYPE.USDC]: 'icon-A',
    [ANALYTICS_CARD_TYPE.stMATIC]: 'icon-B',
    [ANALYTICS_CARD_TYPE.FEE]: 'icon-zuanshi',
  };
  const { data, isLoading } = useQuery(['AnalyticsCard', type], () => api[type](ethersProvider!.getSigner()), {
    enabled: !!ethersProvider,
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
        textAlign: 'center',
        // @ts-ignore
        color: theme => theme.palette[color][theme.palette.mode === 'light' ? 'darker' : 'lighter'],
        // @ts-ignore
        bgcolor: theme => theme.palette[color][theme.palette.mode === 'light' ? 'lighter' : 'darker'],
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          // color: theme => theme.palette[color][theme.palette.mode === 'light' ? 'dark' : 'light'],
          backgroundImage: theme =>
            `linear-gradient(${theme.palette.mode === 'light' ? '135deg' : '-45deg'}, ${alpha(
              theme.palette[color][theme.palette.mode === 'light' ? 'dark' : 'light'],
              0,
            )} 0%, ${alpha(theme.palette[color][theme.palette.mode === 'light' ? 'dark' : 'light'], 0.24)} 100%)`,
        }}
      >
        <BaseIconFont
          name={icon[type]}
          style={{
            width: 22,
            height: 22,
            // @ts-ignore
            fill: theme.palette[color][theme.palette.mode === 'light' ? 'darker' : 'lighter'],
          }}
        />

        {/*<Iconify icon={icon[type]} width={24} height={24} />*/}
      </StyledIcon>
      <Typography variant="h3">
        {!isLoading ? (
          type === ANALYTICS_CARD_TYPE.FEE ? (
            'feeValue'
          ) : (
            formatDecimal(data, TOKEN_TYPE.USDC).toString()
          )
        ) : (
          <InlineSkeleton />
        )}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title[type]}
      </Typography>
    </Card>
  );
}
