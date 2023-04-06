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

export default function NetWorthApexChart() {
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
      const e2lpSum = data.data.map(i => i.e2lpSum * 100);
      const wstethSum = data.data.map(i => i.wstethSum * 100);

      setOption({
        series: [
          {
            name: (networkName ? ATokenMap[networkName] : '') + t('home.cumulativeRateOfReturn'),
            type: 'area',
            data: e2lpSum,
            color: '#008FFB',
          },
          {
            name: reverseCoin ? reverseCoin + t(`home.cumulativeRateOfReturn`) : '',
            type: 'area',
            data: wstethSum,
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
              decimalsInFloat: 3,
              title: {
                text: (networkName ? ATokenMap[networkName] : '') + t('home.cumulativeRateOfReturn') + '%',
              },

              max: roundMinMaxValues([...e2lpSum, ...wstethSum]).max,
              min: roundMinMaxValues([...e2lpSum, ...wstethSum]).min,
            },
            {
              opposite: true,
              decimalsInFloat: 3,
              title: {
                text: reverseCoin ? reverseCoin + t(`home.cumulativeRateOfReturn`) + '%' : '',
              },
              max: roundMinMaxValues([...wstethSum, ...e2lpSum]).max,
              min: roundMinMaxValues([...wstethSum, ...e2lpSum]).min,
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (val: string) {
                return parseFloat(val).toFixed(3) + '%';
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
