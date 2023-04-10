import { alpha, styled, useTheme } from '@mui/material/styles';
import { Card, IconButton, SxProps, Theme, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import useWallet from '../hooks/useWallet';
import { convertDownPrice, ezWETHFundCost, getLeverage, interestRateYear } from '../wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import BaseIconFont from './BaseIconFont';
import { InlineSkeleton } from './Skeleton';
import * as Net from 'net';
import { ATokenMap, NETWORK_TYPE } from '../wallet/helpers/constant';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
  const { ethersProvider, networkName } = useWallet();

  const theme = useTheme();

  const api = {
    [HOME_CARD_TYPE.Rate]: interestRateYear,
    [HOME_CARD_TYPE.FundCost]: ezWETHFundCost,
    [HOME_CARD_TYPE.RebalancePrice]: convertDownPrice,
    [HOME_CARD_TYPE.Leverage]: getLeverage,
  };
  const title = {
    [HOME_CARD_TYPE.Rate]: t('home.card.rate'),
    [HOME_CARD_TYPE.FundCost]: (networkName ? ATokenMap[networkName] : '') + t('home.card.fundCost'),
    [HOME_CARD_TYPE.RebalancePrice]: (networkName ? ATokenMap[networkName] : '') + t('home.card.rebalancePrice'),
    [HOME_CARD_TYPE.Leverage]: (networkName ? ATokenMap[networkName] : '') + t('home.card.leverage'),
  };
  const icon = {
    [HOME_CARD_TYPE.Rate]: 'icon-yuqinianhualishuai-copy',
    [HOME_CARD_TYPE.FundCost]: 'icon-zijinchengben-copy',
    [HOME_CARD_TYPE.RebalancePrice]: 'icon-xiaoshoujiage-copy',
    [HOME_CARD_TYPE.Leverage]: 'icon-gangganshuai-copy',
  };
  const { data } = useQuery(
    ['totalSupply', type],
    () => api[type](ethersProvider!.getSigner(), networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!networkName,
      onError: err => {
        // debugger;
      },
    },
  );

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
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.disabled,
          fontWeight: 400,
          marginBottom: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title[type]}
        {(type === HOME_CARD_TYPE.RebalancePrice || type === HOME_CARD_TYPE.Leverage) && (
          <CustomTooltip placement="top" title={title[type]}>
            <IconButton size={'small'} sx={{ cursor: 'help' }}>
              <InfoOutlinedIcon sx={{ fontSize: '14px' }} />
            </IconButton>
          </CustomTooltip>
        )}
      </Typography>
      <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
        {data ? (
          type === HOME_CARD_TYPE.Rate || type === HOME_CARD_TYPE.FundCost ? (
            data + '%'
          ) : type === HOME_CARD_TYPE.RebalancePrice ? (
            '$' + data
          ) : (
            data + ''
          )
        ) : (
          <InlineSkeleton />
        )}
      </Typography>
    </Card>
  );
}

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[900],
    // boxShadow: theme.shadows[1],
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[900],
    color: theme.palette.mode === 'light' ? theme.palette.grey[900] : theme.palette.grey[200],
    // boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
