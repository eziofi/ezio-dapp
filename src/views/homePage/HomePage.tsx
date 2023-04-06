import { Container, Grid } from '@mui/material';

import MarketApexChart from './components/MarketApexChart';
import HomeCard, { HOME_CARD_TYPE } from '../components/HomeCard';
import NetWorthApexChart from './components/NetWorthApexChart';
import TotalSupplyApexChart from './components/TotalSupplyApexChart';
import TotleNetWorthApexChart from './components/TotleNetWorthApexChart';
import LineChart from '../analytics/components/LineChart';
import ContractValue from './components/ContractValue';

export default function HomePage() {
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <HomeCard type={HOME_CARD_TYPE.Rate} color="warning" />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <HomeCard type={HOME_CARD_TYPE.FundCost} color="error" />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <HomeCard type={HOME_CARD_TYPE.RebalancePrice} />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <HomeCard type={HOME_CARD_TYPE.Leverage} />
          </Grid>

          {/* <Grid item xs={12} md={12} lg={12}>
            <PriceTable />
          </Grid> */}
          <Grid item xs={12} md={6} lg={6}>
            <LineChart />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <NetWorthApexChart />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <ContractValue />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <TotleNetWorthApexChart />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
