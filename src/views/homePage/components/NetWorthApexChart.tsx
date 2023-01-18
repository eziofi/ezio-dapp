import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { queryTokenGroup } from '../../../api/api';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../../theme';

export default function NetWorthApexChart() {
  const [option, setOption] = useState<any>(null);
  const theme = useTheme();

  const { mode } = useContext(ColorModeContext);

  const queryClient: QueryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('queryTotalNetWorth');
  }, [mode]);

  useQuery('queryTokenGroup', queryTokenGroup, {
    onSuccess: data => {
      const XData = data.data.data.map(i => parseInt(i.groupTime));
      const aNetWorth = data.data.data.map(i => i.ezatNetWorth);
      const bNetWorth = data.data.data.map(i => i.ezbtNetWorth);
      const aRate = data.data.data.map(i => i.ezatRate);

      setOption({
        series: [
          {
            name: t('home.aNetWorthSeries'),
            type: 'area',
            data: aNetWorth,
          },
          {
            name: t('home.bNetWorthSeries'),
            type: 'area',
            data: bNetWorth,
          },
          {
            name: t('home.aRateAxis'),
            type: 'line',
            data: aRate,
          },
        ],
        options: {
          theme: {
            mode,
          },
          chart: {
            background: 'transparent',
            height: 350,
            type: 'line',
            toolbar: {
              show: false,
            },
          },
          stroke: {
            curve: 'smooth',
          },
          fill: {
            type: 'solid',
            opacity: [0.2, 0.2],
          },
          labels: XData,
          markers: {
            size: 0,
          },
          yaxis: [
            {
              show: false,
              title: {
                text: t('home.netWorthEzatAxis'),
              },
              max: getYMax([...bNetWorth, ...aNetWorth]),
            },
            {
              title: {
                text: t('home.netWorthAxis'),
              },
              max: getYMax([...bNetWorth, ...aNetWorth]),
            },
            {
              opposite: true,
              title: {
                text: t('home.aRateAxis'),
              },
              max: getYMax(aRate),
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
          },
        },
      });
    },
  });

  return (
    <Card>
      <CardHeader title={t('home.priceTitle') as string} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {/*@ts-ignore*/}
        {option && <ReactApexChart options={option.options} series={option.series} type="line" height={350} />}
      </Box>
    </Card>
  );
}
