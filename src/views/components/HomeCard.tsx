import { alpha, styled, useTheme } from '@mui/material/styles';
import { Card, SxProps, Theme, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import useWallet from '../hooks/useWallet';
import { convertDownPrice, ezMATICFundCost, getLeverage, interestRateYear } from '../wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import BaseIconFont from './BaseIconFont';
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

export enum HOME_CARD_TYPE {
  Rate,
  FundCost,
  RebalancePrice,
  Leverage,
}
export default function HomeCard({
  type,
  color = 'primary',
  sx,
  ...other
}: {
  type: HOME_CARD_TYPE;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  sx?: SxProps<Theme>;
}) {
  const { t } = useTranslation();
  const { ethersProvider } = useWallet();

  const theme = useTheme();

  const api = {
    [HOME_CARD_TYPE.Rate]: interestRateYear,
    [HOME_CARD_TYPE.FundCost]: ezMATICFundCost,
    [HOME_CARD_TYPE.RebalancePrice]: convertDownPrice,
    [HOME_CARD_TYPE.Leverage]: getLeverage,
  };
  const title = {
    [HOME_CARD_TYPE.Rate]: t('home.card.rate'),
    [HOME_CARD_TYPE.FundCost]: t('home.card.fundCost'),
    [HOME_CARD_TYPE.RebalancePrice]: t('home.card.rebalancePrice'),
    [HOME_CARD_TYPE.Leverage]: t('home.card.leverage'),
  };
  const icon = {
    [HOME_CARD_TYPE.Rate]: theme.palette.mode === 'light' ? 'icon-yuqinianhualishuai' : 'icon-yuqinianhualishuai-copy',
    [HOME_CARD_TYPE.FundCost]: theme.palette.mode === 'light' ? 'icon-zijinchengben' : 'icon-zijinchengben-copy',
    [HOME_CARD_TYPE.RebalancePrice]: theme.palette.mode === 'light' ? 'icon-xiaoshoujiage' : 'icon-xiaoshoujiage-copy',
    [HOME_CARD_TYPE.Leverage]: theme.palette.mode === 'light' ? 'icon-gangganshuai' : 'icon-gangganshuai-copy',
  };
  // @ts-ignore
  const { data, isLoading } = useQuery(['totalSupply', type], () => api[type](ethersProvider!.getSigner()), {
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
  // @ts-ignore
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
            width: 26,
            height: 26,
            // @ts-ignore
            // fill: theme.palette[color][theme.palette.mode === 'light' ? 'darker' : 'lighter'],
          }}
        />

        {/*<Iconify icon={icon[type]} width={24} height={24} />*/}
      </StyledIcon>

      <Typography variant="h3">
        {data ? type === HOME_CARD_TYPE.Rate ? data + '%' : data : <InlineSkeleton />}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title[type]}
      </Typography>
    </Card>
  );
}
