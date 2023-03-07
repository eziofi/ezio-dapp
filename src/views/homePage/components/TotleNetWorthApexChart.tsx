import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { t } from 'i18next';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../../theme';
import RenderSkeleton from './RenderSkeleton';
import { Box, Card, CardHeader } from '@mui/material';
import { queryAbTotalnetworth } from '../../../api/api';
import { getYMax } from '../../wallet/helpers/utilities';

export default function TotleNetWorthApexChart() {
  const [option, setOption] = React.useState<any>(null);
  const { mode } = React.useContext(ColorModeContext);
  const queryClient: QueryClient = useQueryClient();

  React.useEffect(() => {
    queryClient.invalidateQueries('queryTreasuryValue');
  }, [mode]);

  useQuery(['queryAbTotalnetworth'], queryAbTotalnetworth, {
    onSuccess: ({ data }) => {
      const XData = data.data.map(i => i.groupTime);
      const ezMaticTotalnetworth = data.data.map(i => i.ezMaticTotalnetworth);
      const ezUsdTotalnetworth = data.data.map(i => i.ezUsdTotalnetworth);
      const sum = getYMax([...ezMaticTotalnetworth, ...ezUsdTotalnetworth]);
      setOption({
        series: [
          {
            name: 'ezMaticTotalnetworth',
            type: 'area',
            data: ezMaticTotalnetworth,
          },
          {
            name: 'ezUsdTotalnetworth',
            type: 'area',
            data: ezUsdTotalnetworth,
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
                text: 'ezMaticTotalnetworth',
              },
              decimalsInFloat: 0,
              min: 0,
              max: sum,
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
          },
        },
      });
    },
  });

  return (
    <Card>
      <CardHeader title="价值" />

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
