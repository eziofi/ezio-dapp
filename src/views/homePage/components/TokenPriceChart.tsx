// token价格图表
import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { queryTokenGroup, queryMaticPrice } from '../../../api/api';
import { t } from 'i18next';
import { formatString, getYMax, getYMin, roundMinMaxValues } from '../../wallet/helpers/utilities';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../../theme';
import RenderSkeleton from './RenderSkeleton';
import { HomeCardHeader } from '../mainStyle';
import RenderSelect from './RenderSelect';
import useWallet from '../../hooks/useWallet';
import { ATokenMap, NETWORK_TYPE } from '../../wallet/helpers/constant';

export default function TokenPriceChart() {
  const [option, setOption] = useState<any>(null);
  const theme = useTheme();

  const { mode } = useContext(ColorModeContext);

  const queryClient: QueryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('queryTreasuryValue');
  }, [mode]);

  const [queryType, setQueryType] = useState('hour');
  const { reverseCoin, networkName } = useWallet();

  useQuery(['queryMaticPrice', queryType], () => queryMaticPrice(queryType, networkName as NETWORK_TYPE), {
    enabled: !!reverseCoin && !!networkName,
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

      setOption({
        series: [
          {
            name: (networkName ? ATokenMap[networkName] : '') + t('home.bNetWorthSeries'),
            type: 'area',
            data: ezMaticPrice,
            color: '#008FFB',
          },
          {
            name: reverseCoin ? t(`home.${reverseCoin}Price`) : '',
            type: 'area',
            data: stMaticPrice,
            color: '#00E396',
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
            zoom: {
              enabled: false,
            },
          },
          stroke: {
            curve: 'smooth',
            width: 3,
          },
          markers: {
            size: 2,
            colors: ['#008FFB', '#00E396'],
            strokeColors: ['#008FFB', '#00E396'],
          },
          fill: {
            type: 'solid',
            opacity: [0.1, 0.1],
          },
          labels: XData,
          yaxis: [
            {
              decimalsInFloat: 2,
              title: {
                text: (networkName ? ATokenMap[networkName] : '') + t('home.bNetWorthSeries'),
              },

              // max: roundMinMaxValues(ezMaticPrice).max,
              // min: roundMinMaxValues(ezMaticPrice).min,
              max: 3,
              min: 0,
            },
            {
              opposite: true,
              decimalsInFloat: 0,
              title: {
                text: reverseCoin ? t(`home.${reverseCoin}Price`) : '',
                y: {
                  formatter: function (val: string) {
                    return val;
                  },
                },
              },
              max: roundMinMaxValues(stMaticPrice).max,
              min: roundMinMaxValues(stMaticPrice).min,
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (val: string, { seriesIndex }: any) {
                return seriesIndex === 2 ? parseFloat(val).toFixed(2) + '%' : parseFloat(val).toFixed(2);
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
