import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { t } from 'i18next';
import { ColorModeContext } from '../../../theme';
import RenderSkeleton from './RenderSkeleton';
import { Box, Card, CardHeader } from '@mui/material';
import { queryAbTotalnetworth } from '../../../api/api';
import { getYMax, getYMin } from '../../wallet/helpers/utilities';
import { HomeCardHeader } from '../mainStyle';
import RenderSelect from './RenderSelect';
import useWallet from '../../hooks/useWallet';
import { NETWORK_TYPE } from '../../wallet/helpers/constant';

export default function TotleNetWorthApexChart() {
  const [option, setOption] = React.useState<any>(null);
  const { mode } = React.useContext(ColorModeContext);
  const queryClient: QueryClient = useQueryClient();

  React.useEffect(() => {
    queryClient.invalidateQueries('queryTreasuryValue');
  }, [mode]);

  const [queryType, setQueryType] = React.useState('hour');

  const { networkName } = useWallet();

  useQuery(['queryAbTotalnetworth', queryType], () => queryAbTotalnetworth(queryType, networkName as NETWORK_TYPE), {
    enabled: !!networkName,
    onSuccess: ({ data }) => {
      const XData = data.data.map(i => {
        if (queryType === 'hour') {
          return String(parseInt(i.groupTime.slice(-2)));
        } else {
          return i.groupTime.slice(5, 10);
        }
      });

      const ezMaticTotalnetworth = data.data.map(i => i.ezMaticTotalnetworth);
      const ezUsdTotalnetworth = data.data.map(i => i.ezUsdTotalnetworth);
      const sum = [...ezMaticTotalnetworth, ...ezUsdTotalnetworth];
      setOption({
        series: [
          {
            name: t('home.ezUsdTotalnetworth'),
            type: 'area',
            data: ezUsdTotalnetworth,
          },
          {
            name: t('home.ezWETHTotalnetworth'),
            type: 'area',
            data: ezMaticTotalnetworth,
          },

          // {
          //   name: t('home.ethPrice'),
          //   type: 'area',
          //   data: ethData,
          // },
        ],
        options: {
          theme: {
            mode,
          },
          chart: {
            // @ts-ignore
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
                text: t('home.ezWETHTotalnetworth'),
              },
              decimalsInFloat: 0,
              max: getYMax(sum),
              min: getYMin(sum),
            },
            // {
            //   title: {
            //     text: 'ezUsdTotalnetworth',
            //   },
            //   decimalsInFloat: 0,
            //   min: 0,
            //   max: getYMax(ezUsdTotalnetworth),
            // },
            // {
            //   opposite: true,
            //   title: {
            //     text: t('home.ethPrice'),
            //   },
            //   decimalsInFloat: 0,
            //   max: getYMax(ethData),
            // },
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
      <HomeCardHeader>
        <CardHeader title={t('home.abNetworth') as string} />

        <RenderSelect value={queryType} onChange={setQueryType} />
      </HomeCardHeader>

      <Box dir="ltr" sx={{ pl: 2, pr: 2 }}>
        {option ? (
          <ReactApexChart options={option.options} series={option.series} type="line" height={350} />
        ) : (
          <RenderSkeleton />
        )}
      </Box>
    </Card>
  );
}
