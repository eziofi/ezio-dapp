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
      const XData = data.data.map(i => parseInt(i.groupTime?.split('-')[i.groupTime.split('-').length - 1]));
      // @ts-ignore
      const ezMaticPrice = data.data.map(i => +i.ezMaticPrice);
      const stMaticPrice = data.data.map(i => +i.stMaticPrice);
      const aRate = data.data.map(i => +parseFloat(String(i.ezUsdRate * 10000)).toFixed(2));

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
              decimalsInFloat: 2,
              title: {
                text: t('home.netWorthEzatAxis'),
                y: {
                  formatter: function (val: string) {
                    return val;
                  },
                },
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
              decimalsInFloat: 2,
              opposite: true,
              title: {
                text: t('home.aRateAxis') + ' ( ‱ ) ',
              },
              max: getYMax(aRate),
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (val: string, { seriesIndex }: any) {
                return seriesIndex === 2 ? val + '‱' : val;
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
