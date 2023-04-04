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
import { ATokenMap, NETWORK_TYPE } from '../../wallet/helpers/constant';

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
      const total = data.data.map(i => i.ezMaticTotalnetworth + i.ezUsdTotalnetworth);
      const sum = [...ezMaticTotalnetworth, ...ezUsdTotalnetworth];
      setOption({
        series: [
          {
            name: (networkName ? ATokenMap[networkName] : '') + t('home.BTokenTotalnetworth'),
            type: 'area',
            data: total,
          },
          {
            name: t('home.USDETotalnetworth'),
            type: 'area',
            data: ezUsdTotalnetworth,
          },
        ],
        options: {
          theme: { mode },
          chart: {
            background: 'transparent',
            height: 350,
            type: 'line',
            toolbar: { show: false },
            zoom: { enabled: false },
          },
          stroke: { curve: 'smooth' },
          fill: {
            type: 'solid',
            opacity: [1, 1],
          },
          labels: XData,
          markers: { size: 0 },
          yaxis: [
            {
              title: {
                text: (networkName ? ATokenMap[networkName] : '') + t('home.BTokenTotalnetworth'),
              },
              decimalsInFloat: 0,
              max: getYMax(total),
              min: getYMin(sum),
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (val: string, obj: any) {
                if (obj.seriesIndex === 0) {
                  // 总净值 减去 usde = e2lp
                  return (+parseFloat(val).toFixed(2) - +parseFloat(obj.series[1][obj.dataPointIndex])).toFixed(2);
                }
                return parseFloat(val).toFixed(2);
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
