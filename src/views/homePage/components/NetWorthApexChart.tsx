import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { queryTokenGroup } from '../../../api/api';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';
import { useState } from 'react';

export default function NetWorthApexChart() {
  const [option, setOption] = useState<any>(null);

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
          chart: {
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
              title: {
                text: t('home.netWorthEzatAxis'),
              },
              max: getYMax([...bNetWorth, ...aNetWorth]),
            },
            {
              title: {
                text: t('home.netWorthEzbtAxis'),
              },
              max: getYMax([...bNetWorth, ...aNetWorth]),
            },
            {
              opposite: true,
              title: {
                text: t('home.aRateAxis'),
              },
              max: getYMax(aRate),
              // interval: getYMax(ethData) / 5,
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
