import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { queryTotalNetWorth } from '../../../api/api';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../../theme';

export default function MarketApexChart() {
  const [option, setOption] = useState<any>(null);
  const theme = useTheme();
  const { mode } = useContext(ColorModeContext);

  const queryClient: QueryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('queryTotalNetWorth');
  }, [mode]);

  useQuery('queryTotalNetWorth', queryTotalNetWorth, {
    onSuccess: data => {
      const XData = data.data.data.map(i => parseInt(i.groupTime));
      const treasuryData = data.data.data.map(i => i.totalNetWorth);
      const ethData = data.data.data.map(i => i.ethPrice);

      setOption({
        series: [
          {
            name: t('home.treasuryValue'),
            type: 'area',
            data: treasuryData,
          },
          {
            name: t('home.ethPrice'),
            type: 'area',
            data: ethData,
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
                text: t('home.treasuryValue'),
              },
              decimalsInFloat: 0,
              min: 0,
              max: getYMax(treasuryData),
            },
            {
              opposite: true,
              title: {
                text: t('home.ethPrice'),
              },
              decimalsInFloat: 0,
              max: getYMax(ethData),
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

      <Box dir="ltr">
        {/*<Box sx={{ p: 3, pb: 1 }} dir="ltr">*/}
        {option && <ReactApexChart options={option.options} series={option.series} type="line" height={350} />}
      </Box>
    </Card>
  );
}
