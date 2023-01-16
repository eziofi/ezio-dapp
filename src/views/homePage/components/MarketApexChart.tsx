import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { queryTotalNetWorth } from '../../../api/api';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';
import { useState } from 'react';

export default function MarketApexChart() {
  const [option, setOption] = useState<any>(null);

  useQuery('queryTotalNetWorth', queryTotalNetWorth, {
    onSuccess: data => {
      const XData = data.data.data.map(i => parseInt(i.groupTime));
      const treasuryData = data.data.data.map(i => i.totalNetWorth);
      const ethData = data.data.data.map(i => i.ethPrice);

      setOption({
        series: [
          {
            name: t('home.treasuryValue'),
            type: 'area',
            data: treasuryData,
          },
          {
            name: t('home.ethPrice'),
            type: 'area',
            data: ethData,
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
                text: t('home.treasuryValue'),
              },
              min: 5,
              max: getYMax(treasuryData),
              // interval: getYMax(treasuryData) / 5,
            },
            {
              opposite: true,
              title: {
                text: t('home.ethPrice'),
              },
              max: getYMax(ethData),
              // interval: getYMax(ethData) / 5,
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y: any) {
                if (typeof y !== 'undefined') {
                  return y.toFixed(0) + ' points';
                }
                return y;
              },
            },
          },
        },
      });
    },
  });

  return (
    <Card>
      <CardHeader title={t('home.treasuryValue') as string} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {/*@ts-ignore*/}
        {option && <ReactApexChart options={option.options} series={option.series} type="line" height={350} />}
      </Box>
    </Card>
  );
}
