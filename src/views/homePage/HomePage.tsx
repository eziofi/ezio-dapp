import { Container, Grid } from '@mui/material';
import PriceTable from './components/PriceTable';

import MarketApexChart from './components/MarketApexChart';
import HomeCard from '../components/HomeCard';
import NetWorthApexChart from './components/NetWorthApexChart';
import TotalSupplyApexChart from './components/TotalSupplyApexChart';

export default function HomePage() {
  return (
    <>
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
