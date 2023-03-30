import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { queryTokenGroup, queryMaticPrice } from '../../../api/api';
import { t } from 'i18next';
import { formatString, getYMax, getYMin } from '../../wallet/helpers/utilities';
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

      setOption({
        series: [
          {
            name: reverseCoin ? t(`home.${reverseCoin}Price`) : '',
            type: 'area',
            data: stMaticPrice,
          },
          {
            name: (networkName ? ATokenMap[networkName] : '') + t('home.bNetWorthSeries'),
            type: 'area',
            data: ezMaticPrice,
          },
          // {
          //   name: t('home.aRateAxis'),
          //   type: 'line',
          //   data: aRate,
          // },
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
              decimalsInFloat: 0,
              title: {
                text: reverseCoin ? t(`home.${reverseCoin}Price`) : '',
                y: {
                  formatter: function (val: string) {
                    return val;
                  },
                },
              },
              max: getYMax(stMaticPrice),
              min: getYMin(stMaticPrice),
            },
            {
              // show: false,
              opposite: true,
              decimalsInFloat: 1,
              title: {
                text: (networkName ? ATokenMap[networkName] : '') + t('home.bNetWorthSeries'),
              },
              max: getYMax(ezMaticPrice),
              min: getYMin(ezMaticPrice),
            },

            // {
            //   decimalsInFloat: 1,
            //   opposite: true,
            //   title: {
            //     text: t('home.aRateAxis') + ' ( % ) ',
            //   },
            //   max: getYMax(aRate),
            // },
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
