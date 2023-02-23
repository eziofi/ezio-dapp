import { alpha, styled, useTheme } from '@mui/material/styles';
import { Card, SxProps, Theme, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import useWallet from '../../hooks/useWallet';
import {
  ezatTotalSupply,
  ezbtTotalSupply,
  treasuryInterestRate,
  treasuryTotalNetWorth,
} from '../../wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import { formatNetWorth, formatNum, toNum } from '../../wallet/helpers/utilities';
import BaseIconFont from '../BaseIconFont';
import { TOKEN_TYPE } from '../../wallet/helpers/constant';

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

enum VALUE_TYPE {
  EZAT = 'EZAT',
  EZBT = 'EZBT',
  treasury = 'treasury',
  rate = 'rate',
}
export default function HomeCard({
  type,
  color = 'primary',
  sx,
  ...other
}: {
  type: keyof typeof VALUE_TYPE;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  sx?: SxProps<Theme>;
}) {
  const { t } = useTranslation();
  const { ethersProvider } = useWallet();

  const theme = useTheme();

  const api = {
    EZAT: ezatTotalSupply,
    EZBT: ezbtTotalSupply,
    treasury: treasuryTotalNetWorth,
    rate: treasuryInterestRate,
  };
  const title = {
    EZAT: t('home.EZAT_totalSupply'),
    EZBT: t('home.EZBT_totalSupply'),
    treasury: t('home.treasury_totalValue'),
    rate: t('home.EZAT_Rate'),
  };
  const icon = {
    EZAT: 'icon-A',
    EZBT: 'icon-B',
    treasury: 'icon-zuanshi',
    rate: 'icon-weidaizijinchilixichaxun',
  };
  const { data } = useQuery(['totalSupply', type], () => api[type](ethersProvider!.getSigner()), {
    enabled: !!ethersProvider,
    onSuccess: data1 => {
      // if (type === VALUE_TYPE.rate) {
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

      {type === VALUE_TYPE.rate ? (
        <Typography variant="h3">{data ? (parseFloat(formatNetWorth(data)) / 10000).toFixed(2) : 0} ‱</Typography>
      ) : (
        <Typography variant="h3">{data ? formatNum(data, TOKEN_TYPE.USDC).toUnsafeFloat().toFixed(2) : 0}</Typography>
      )}
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title[type]}
      </Typography>
    </Card>
  );
}
