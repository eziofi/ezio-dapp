import { Box, Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { queryTokenGroup } from '../../../api/api';
import { t } from 'i18next';
import { getYMax, getYMin } from '../../wallet/helpers/utilities';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../../theme';
import RenderSkeleton from './RenderSkeleton';
import { HomeCardHeader } from '../mainStyle';
import RenderSelect from './RenderSelect';
import useWallet from '../../hooks/useWallet';
import { ATokenMap, NETWORK_TYPE } from '../../wallet/helpers/constant';

export default function TotalSupplyApexChart() {
  const [option, setOption] = useState<any>(null);
  const theme = useTheme();

  const { mode } = useContext(ColorModeContext);

  const queryClient: QueryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('queryTreasuryValue');
  }, [mode]);

  const [queryType, setQueryType] = useState('hour');

  const { networkName } = useWallet();

  useQuery(['queryTokenGroup', queryType], () => queryTokenGroup(queryType, networkName as NETWORK_TYPE), {
    enabled: !!networkName,
    onSuccess: ({ data }) => {
      const XData = data.data.map(i => {
        if (queryType === 'hour') {
          return String(parseInt(i.groupTime.slice(-2)));
        } else {
          return i.groupTime.slice(5, 10);
        }
      });
      const aTotalSupply = data.data.map(i => i.ezatSupply);
      const bTatalSupply = data.data.map(i => i.ezbtSupply);

      const totalSupplyMax = getYMax([...aTotalSupply, ...bTatalSupply]);

      setOption({
        series: [
          {
            name: t('home.aTotalSupplySeries'),
            type: 'area',
            data: aTotalSupply,
          },
          {
            name: (networkName ? ATokenMap[networkName] : '') + t('home.bTotalSupplySeries'),
            type: 'area',
            data: bTatalSupply,
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
          labels: XData,
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
          yaxis: [
            {
              title: {
                text: t('home.totalSupplyAxis'),
              },
              decimalsInFloat: 0,
              min: getYMin([...aTotalSupply, ...bTatalSupply]),
              max: totalSupplyMax,
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (val: string) {
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
        <CardHeader title={t('home.totalSupplyTitle') as string} />

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
