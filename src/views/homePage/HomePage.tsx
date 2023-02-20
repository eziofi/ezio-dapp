import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Box, Container, FormControlLabel, Grid, Link, Switch } from '@mui/material';
import walletBtn from '../../assets/home/wallet@2x.png';
import MarketChart from './components/MarketChart';
import PriceTable from './components/PriceTable';
import NetDrawer from './components/NetDrawer';
import LangDrawer from './components/LangDrawer';
import useWallet from '../hooks/useWallet';
import { styled } from '@mui/material/styles';
import {
  TitleContainer,
  ImageBox,
  ChartBox,
  MintBox,
  MintCard,
  MintCardTitle,
  MintCardValue,
  TitleBtnBox,
} from './mainStyle';

import {
  ezatTotalSupply,
  ezbtTotalSupply,
  treasuryInterestRate,
  treasuryTotalNetWorth,
} from '../wallet/helpers/contract_call';
import { formatNetWorth, toNum } from '../wallet/helpers/utilities';
import NetWorthChart from './components/NetWorthChart';
import TotalSupplyChart from './components/TotalSupplyChart';
import MarketApexChart from './components/MarketApexChart';
import HomeCard from '../components/dashboard/HomeCard';
import { Helmet } from 'react-helmet-async';
import Paper from '@mui/material/Paper';
import NetWorthApexChart from './components/NetWorthApexChart';
import TotalSupplyApexChart from './components/TotalSupplyApexChart';

export default function HomePage() {
  const [netDrawerOpened, setNetDrawerOpened] = useState(false);
  const [netChecked, setNetChecked] = useState('mainnet');
  const [langDrawerOpened, setLangDrawerOpened] = useState(false);
  const { t } = useTranslation();
  const { connectState, connect, disconnect, account, ethersProvider } = useWallet();

  return (
    <>
      {/*<Box>*/}
      {/*  <PriceTable />*/}
      {/*</Box>*/}
      {/*<ChartBox>*/}
      {/*<Box className={styles.chartTitle}>{t('home.treasury')}</Box>*/}
      {/*<MarketChart />*/}
      {/*</ChartBox>*/}
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <HomeCard type={VALUE_TYPE.treasury} color="warning" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <HomeCard type={VALUE_TYPE.rate} color="error" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <HomeCard type={VALUE_TYPE.EZAT} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <HomeCard type={VALUE_TYPE.EZBT} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <PriceTable />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MarketApexChart />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <NetWorthApexChart />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TotalSupplyApexChart />
          </Grid>
        </Grid>
      </Container>

      {/*<ChartBox>*/}
      {/*  <NetWorthChart />*/}
      {/*</ChartBox>*/}
      {/*<ChartBox>*/}
      {/*  <TotalSupplyChart />*/}
      {/*</ChartBox>*/}
      {/*{ethersProvider && <TotalSupplyBox />}*/}
      {/*<NetDrawer*/}
      {/*  opened={netDrawerOpened}*/}
      {/*  close={() => setNetDrawerOpened(false)}*/}
      {/*  netChecked={netChecked}*/}
      {/*  setNetChecked={setNetChecked}*/}
      {/*/>*/}
      {/*/!*<WalletDrawer opened={walletDrawerOpened} close={() => setWalletDrawerOpened(false)} />*!/*/}
      {/*<LangDrawer opened={langDrawerOpened} close={() => setLangDrawerOpened(false)} />*/}
    </>
  );
}

enum VALUE_TYPE {
  EZAT = 'EZAT',
  EZBT = 'EZBT',
  treasury = 'treasury',
  rate = 'rate',
}
function ValueCard({ type }: { type: VALUE_TYPE }) {
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
    <MintCard>
      <MintCardTitle>{title[type]}</MintCardTitle>
      {type === VALUE_TYPE.rate ? (
        <MintCardValue>{data ? (parseFloat(formatNetWorth(data)) / 10000).toFixed(2) : 0} ‱</MintCardValue>
      ) : (
        <MintCardValue>{data ? toNum(data).toFixed() : 0}</MintCardValue>
      )}
      {/*<Box className={styles.mintCardValue}>{data ? formatNetWorth(data) : 0}</Box>*/}
    </MintCard>
  );
}
