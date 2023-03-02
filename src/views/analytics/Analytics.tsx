import { Container, Grid } from '@mui/material';
import AnalyticsCard, { ANALYTICS_CARD_TYPE } from '../components/AnalyticsCard';

export default function Analytics() {
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={true}>
            <AnalyticsCard type={ANALYTICS_CARD_TYPE.USDC} color="warning" />
          </Grid>
          <Grid item xs={12} sm={6} md={true}>
            <AnalyticsCard type={ANALYTICS_CARD_TYPE.stMATIC} color="error" />
          </Grid>
          <Grid item xs={12} sm={6} md={true}>
            <AnalyticsCard type={ANALYTICS_CARD_TYPE.FEE} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
