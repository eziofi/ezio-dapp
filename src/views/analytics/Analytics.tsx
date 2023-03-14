import { Container, Grid } from '@mui/material';
import AnalyticsCard, { ANALYTICS_CARD_TYPE } from '../components/AnalyticsCard';
import BarChart from './components/BarChart';
import { useTheme } from '@mui/material';
import LineChart from './components/LineChart';

export default function Analytics() {
  const theme = useTheme();

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={true} sm={true} md={true}>
            <AnalyticsCard type={ANALYTICS_CARD_TYPE.USDC} color="warning" />
          </Grid>
          <Grid item xs={true} sm={true} md={true}>
            <AnalyticsCard type={ANALYTICS_CARD_TYPE.stMATIC} color="error" />
          </Grid>
          <Grid item xs={true} sm={true} md={true}>
            <AnalyticsCard type={ANALYTICS_CARD_TYPE.FEE} />
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: theme.spacing(3) }} spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <LineChart />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <BarChart />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
