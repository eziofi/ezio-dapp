// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, SxProps, Theme, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import { useTranslation } from 'react-i18next';
import useWallet from '../../hooks/useWallet';
import {
  ezatTotalSupply,
  ezbtTotalSupply,
  treasuryInterestRate,
  treasuryTotalNetWorth,
} from '../../wallet/helpers/contract_call';
import { useQuery } from 'react-query';
import { MintCardValue } from '../../homePage/mainStyle';
import { formatNetWorth, toNum } from '../../wallet/helpers/utilities';

// ----------------------------------------------------------------------

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
export default function AppWidgetSummary({
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
    EZAT: 'ant-design:android-filled',
    EZBT: 'ant-design:android-filled',
    treasury: 'ant-design:android-filled',
    rate: 'ant-design:android-filled',
  };
  const { data } = useQuery(['totalSupply', type], () => api[type](ethersProvider!.getSigner()), {
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
        color: theme => theme.palette[color].darker,
        // @ts-ignore
        bgcolor: theme => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: theme => theme.palette[color].dark,
          backgroundImage: theme =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24,
            )} 100%)`,
        }}
      >
        <Iconify icon={icon[type]} width={24} height={24} />
      </StyledIcon>

      {type === VALUE_TYPE.rate ? (
        <Typography variant="h3">{data ? (parseFloat(formatNetWorth(data)) / 10000).toFixed(2) : 0} ‱</Typography>
      ) : (
        <Typography variant="h3">{data ? toNum(data).toFixed() : 0}</Typography>
      )}
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title[type]}
      </Typography>
    </Card>
  );
}
