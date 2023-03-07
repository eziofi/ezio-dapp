import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { queryTokenGroup, queryMaticPrice } from '../../../api/api';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../../theme';
import RenderSkeleton from './RenderSkeleton';

export default function NetWorthApexChart() {
  const [option, setOption] = useState<any>(null);
  const theme = useTheme();

  const { mode } = useContext(ColorModeContext);

  const queryClient: QueryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('queryTreasuryValue');
  }, [mode]);

  useQuery('queryMaticPrice', queryMaticPrice, {
    onSuccess: ({ data }) => {
      // const XData = data.data.data.map(i => parseInt(i.groupTime));
      // const aNetWorth = data.data.data.map(i => i.ezatNetWorth);
      // const bNetWorth = data.data.data.map(i => i.ezbtNetWorth);
      // const aRate = data.data.data.map(i => i.ezatRate);

      const XData = data.data.map(i => i.groupTime.substring(5));
      const ezMaticPrice = data.data.map(i => i.ezMaticPrice);
      const stMaticPrice = data.data.map(i => i.stMaticPrice);
      console.log('🚀 ~ file: NetWorthApexChart.tsx:34 ~ NetWorthApexChart ~ stMaticPrice:', stMaticPrice[0]);
      const aRate = data.data.map(i => i.ezUsdRate);

      setOption({
        series: [
          {
            name: t('home.stMaticPrice'),
            type: 'area',
            data: stMaticPrice,
          },
          {
            name: t('home.bNetWorthSeries'),
            type: 'area',
            data: ezMaticPrice,
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
              title: {
                text: t('home.netWorthEzatAxis'),
              },
              max: getYMax([...ezMaticPrice, ...stMaticPrice]),
            },
            {
              show: false,
              title: {
                text: t('home.netWorthAxis'),
              },
              max: getYMax([...ezMaticPrice, ...stMaticPrice]),
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
            y: {
              formatter: function (val: string) {
                return val;
              },
            },
          },
        },
      });
    },
  });

  return (
    <Card>
      <CardHeader title={t('home.priceTitle') as string} />

      <Box dir="ltr">
        {option ? (
          <ReactApexChart options={option.options} series={option.series} type="line" height={350} />
        ) : (
          <RenderSkeleton />
        )}
      </Box>
    </Card>
  );
}
