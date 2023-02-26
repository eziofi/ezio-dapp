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
            <HomeCard type={HOME_CARD_TYPE.treasury} color="warning" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <HomeCard type={HOME_CARD_TYPE.rate} color="error" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <HomeCard type={HOME_CARD_TYPE.EZAT} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <HomeCard type={HOME_CARD_TYPE.EZBT} />
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
    </>
  );
}

enum HOME_CARD_TYPE {
  EZAT = 'EZAT',
  EZBT = 'EZBT',
  treasury = 'treasury',
  rate = 'rate',
}
