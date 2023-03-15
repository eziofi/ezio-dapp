import { Box, Card, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { queryTotalNetWorth, queryTreasuryValue } from '../../../api/api';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../../theme';
import RenderSkeleton from './RenderSkeleton';
import { HomeCardHeader } from '../mainStyle';
import RenderSelect from './RenderSelect';

export default function MarketApexChart() {
  const [option, setOption] = useState<any>(null);
  const theme = useTheme();
  const { mode } = useContext(ColorModeContext);

  const queryClient: QueryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('queryTreasuryValue');
  }, [mode]);

  const [queryType, setQueryType] = useState('hour');

  useQuery(['queryTreasuryValue', queryType], () => queryTreasuryValue(queryType), {
    onSuccess: ({ data }) => {
      const XData = data.data.map(i => {
        if (queryType === 'hour') {
          return String(parseInt(i.groupTime.slice(-2)));
        } else {
          return i.groupTime.slice(5, 10);
        }
      });
      const treasuryData = data.data.map(i => parseFloat(i.treasuryValue));

      setOption({
        series: [
          {
            name: t('home.treasuryValue'),
            type: 'area',
            data: treasuryData,
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
                text: t('home.treasuryValue'),
              },
              decimalsInFloat: 0,
              min: 0,
              max: getYMax(treasuryData),
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
      <HomeCardHeader>
        <CardHeader title={t('home.treasuryValue') as string} />

        <RenderSelect value={queryType} onChange={setQueryType} />
      </HomeCardHeader>

      <Box dir="ltr" sx={{ pl: 2 }}>
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
