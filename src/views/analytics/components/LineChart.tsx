import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { convertDownPrice } from '../../../api/api';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';
import { useContext, useEffect, useState } from 'react';
import { ColorModeContext } from '../../../theme';
import RenderSkeleton from '../../homePage/components/RenderSkeleton';
import useWallet from '../../hooks/useWallet';
import { NETWORK_TYPE } from '../../wallet/helpers/constant';

export default function LineChart() {
  const [option, setOption] = useState<any>(null);
  const { mode } = useContext(ColorModeContext);

  const { networkName } = useWallet();

  useQuery('convertDownPrice', () => convertDownPrice(networkName as NETWORK_TYPE), {
    enabled: !!networkName,
    onSuccess: data => {
      const XData = data.data.data.map(i => i.groupTime.substring(5));
      const ezMaticPrice = data.data.data.map(i => i.ezMaticPrice);
      const convertDownPrice = data.data.data.map(i => i.convertDownPrice);

      setOption({
        series: [
          {
            name: t('home.netWorthEzbtAxis'),
            type: 'area',
            data: ezMaticPrice,
          },
          {
            name: t('home.card.rebalancePrice'),
            type: 'area',
            data: convertDownPrice,
          },
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
                text: t('home.netWorthEzbtAxis'),
              },
              decimalsInFloat: 2, // 保留几位小数
              min: 0,
              max: getYMax(ezMaticPrice),
            },
            {
              opposite: true,
              title: {
                text: t('home.card.rebalancePrice'),
              },
              decimalsInFloat: 2,
              min: 0,
              max: getYMax(ezMaticPrice),
            },
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
      <CardHeader title={t('home.netWorthEzbtAxis') as string} />

      <Box dir="ltr">
        {/*<Box sx={{ p: 3, pb: 1 }} dir="ltr">*/}
        {option ? (
          <ReactApexChart options={option.options} series={option.series} type="line" height={350} />
        ) : (
          <RenderSkeleton />
        )}
      </Box>
    </Card>
  );
}
