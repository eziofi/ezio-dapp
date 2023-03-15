import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { queryTokenGroup, queryMaticPrice } from '../../../api/api';
import { t } from 'i18next';
import { formatString, getYMax } from '../../wallet/helpers/utilities';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../../theme';
import RenderSkeleton from './RenderSkeleton';
import { HomeCardHeader } from '../mainStyle';
import RenderSelect from './RenderSelect';

export default function NetWorthApexChart() {
  const [option, setOption] = useState<any>(null);
  const theme = useTheme();

  const { mode } = useContext(ColorModeContext);

  const queryClient: QueryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('queryTreasuryValue');
  }, [mode]);

  const [queryType, setQueryType] = useState('hour');

  useQuery(['queryMaticPrice', queryType], () => queryMaticPrice(queryType), {
    onSuccess: ({ data }) => {
      const XData = data.data.map(i => {
        if (queryType === 'hour') {
          return String(parseInt(i.groupTime.slice(-2)));
        } else {
          return i.groupTime.slice(5, 10);
        }
      });
      const ezMaticPrice = data.data.map(i => +i.ezMaticPrice);
      const stMaticPrice = data.data.map(i => +i.stMaticPrice);
      const aRate = data.data.map(i => +formatString(String((i.ezUsdRate * 10000 * 365) / 100)));

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
              decimalsInFloat: 0,
              opposite: true,
              title: {
                text: t('home.aRateAxis') + ' ( % ) ',
              },
              max: getYMax(aRate),
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (val: string, { seriesIndex }: any) {
                return seriesIndex === 2 ? val + '%' : val;
              },
            },
          },
        },
      });
    },
  });

  return (
    <Card>
      <HomeCardHeader>
        <CardHeader title={t('home.priceTitle') as string} />

        <RenderSelect value={queryType} onChange={setQueryType} />
      </HomeCardHeader>

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
