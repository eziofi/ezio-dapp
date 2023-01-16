import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { queryTokenGroup } from '../../../api/api';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';
import { useState } from 'react';

export default function TotalSupplyApexChart() {
  const [option, setOption] = useState<any>(null);

  useQuery('queryTokenGroup', queryTokenGroup, {
    onSuccess: data => {
      const XData = data.data.data.map(i => parseInt(i.groupTime));
      const aTotalSupply = data.data.data.map(i => i.ezatSupply);
      const bTatalSupply = data.data.data.map(i => i.ezbtSupply);

      const totalSupplyMax = getYMax([...aTotalSupply, ...aTotalSupply]);

      setOption({
        series: [
          {
            name: t('home.aTotalSupplySeries'),
            type: 'area',
            data: aTotalSupply,
          },
          {
            name: t('home.bTotalSupplySeries'),
            type: 'area',
            data: bTatalSupply,
          },
        ],
        options: {
          chart: {
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
                text: t('home.totalSupplyAxis'),
              },
              min: 0,
              max: totalSupplyMax,
            },
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
      <CardHeader title={t('home.treasuryValue') as string} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {/*@ts-ignore*/}
        {option && <ReactApexChart options={option.options} series={option.series} type="line" height={350} />}
      </Box>
    </Card>
  );
}
