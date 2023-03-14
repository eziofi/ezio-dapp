import { alpha, styled, useTheme } from '@mui/material/styles';
import { Card, SxProps, Theme, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import useWallet from '../hooks/useWallet';
import { convertDownPrice, ezMATICFundCost, getLeverage, interestRateYear } from '../wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import BaseIconFont from './BaseIconFont';
import { InlineSkeleton } from './Skeleton';

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
    [HOME_CARD_TYPE.Rate]: 'icon-yuqinianhualishuai-copy',
    [HOME_CARD_TYPE.FundCost]: 'icon-zijinchengben-copy',
    [HOME_CARD_TYPE.RebalancePrice]: 'icon-xiaoshoujiage-copy',
    [HOME_CARD_TYPE.Leverage]: 'icon-gangganshuai-copy',
  };
  // @ts-ignore
  const { data } = useQuery(['totalSupply', type], () => api[type](ethersProvider!.getSigner()), {
    enabled: !!ethersProvider,
    onError: err => {
      // debugger;
    },
  });

  const IconDivBorderColor = {
    [HOME_CARD_TYPE.Rate]: '#4481EB',
    [HOME_CARD_TYPE.FundCost]: '#F5586D',
    [HOME_CARD_TYPE.RebalancePrice]: '#1CC4C9',
    [HOME_CARD_TYPE.Leverage]: '#FF5858',
  };

  const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(7),
    height: theme.spacing(7),
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    border: `1px solid ${IconDivBorderColor[type]}`,
  }));

  const IconBgColor = {
    [HOME_CARD_TYPE.Rate]: 'radial-gradient(50% 50%, rgba(107, 155, 237, 1) 0%, #6B9BED 100%)',
    [HOME_CARD_TYPE.FundCost]: 'radial-gradient(50% 50%, rgba(235, 122, 141, 1) 0%, #EB7A8D 100%)',
    [HOME_CARD_TYPE.RebalancePrice]: 'radial-gradient(50% 50%, rgba(20, 173, 179, 1) 0%, #14ADB3 100%)',
    [HOME_CARD_TYPE.Leverage]: 'radial-gradient(50% 50%, rgba(222, 106, 106, 1) 0%, #DE6A6A 100%)',
  };

  const IconShadowColor = {
    [HOME_CARD_TYPE.Rate]: '0px 0px 2px 0px rgba(69, 129, 235, 0.6)',
    [HOME_CARD_TYPE.FundCost]: '0px 0px 2px 0px rgba(245, 89, 112, 0.6)',
    [HOME_CARD_TYPE.RebalancePrice]: '0px 0px 2px 0px rgba(28, 196, 201, 0.6)',
    [HOME_CARD_TYPE.Leverage]: '0px 0px 2px 0px rgba(233, 86, 84, 0.6)',
  };

  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        // @ts-ignore
        color: theme => theme.palette[color][theme.palette.mode === 'light' ? 'darker' : 'lighter'],
        // @ts-ignore
        // bgcolor: theme => theme.palette[color][theme.palette.mode === 'light' ? 'lighter' : 'darker'],
        ...sx,
      }}
      {...other}
    >
      <StyledIcon>
        <div
          style={{
            border: '1px solid black',
            width: theme.spacing(6),
            height: theme.spacing(6),
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: IconBgColor[type],
            opacity: 1,
            boxShadow: IconShadowColor[type],
          }}
        >
          <BaseIconFont
            name={icon[type]}
            style={{
              width: 22,
              height: 22,
              // @ts-ignore
              // fill: theme.palette[color][theme.palette.mode === 'light' ? 'darker' : 'lighter'],
              fill: 'white',
            }}
          />
        </div>
      </StyledIcon>

      <Typography variant="h3" sx={{ color: theme.palette.text.primary }}>
        {data ? (
          type === HOME_CARD_TYPE.Rate ? (
            data + '%'
          ) : type === HOME_CARD_TYPE.RebalancePrice ? (
            '$' + data
          ) : (
            data
          )
        ) : (
          <InlineSkeleton />
        )}
      </Typography>
      <Typography sx={{ color: theme.palette.text.disabled }}>{title[type]}</Typography>
    </Card>
  );
}
