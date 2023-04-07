import { Box, Card, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { queryMaticPrice, queryTotalNetWorth, queryTreasuryValue } from '../../../api/api';
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

export default function MarketApexChart() {
  const [option, setOption] = useState<any>(null);
  const theme = useTheme();
  const { mode } = useContext(ColorModeContext);

  const queryClient: QueryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('queryTreasuryValue');
  }, [mode]);

  const [aRate, setARate] = useState<number[] | null>(null);
  const [XData, setXData] = useState<string[] | null>(null);
  // const [treasuryData, setTreasuryData] = useState<number[]>([]);
  const [ezE2LpRate, setEzE2LpRate] = useState<number[] | null>(null);

  const [queryType, setQueryType] = useState('hour');

  const { networkName } = useWallet();

  useQuery(['queryMaticPrice', queryType], () => queryMaticPrice(queryType, networkName as NETWORK_TYPE), {
    enabled: !!networkName,
    onSuccess: ({ data }) => {
      const aRate = data.data.map(i => +formatString(String((i.ezUsdRate * 10000 * 365) / 100)));
      const ezE2LpRate = data.data.map(i => i.ezE2LpRate * 100 * 365);
      setEzE2LpRate(ezE2LpRate);
      setARate([...aRate]);
    },
  });

  useQuery(['queryTreasuryValue', queryType], () => queryTreasuryValue(queryType, networkName as NETWORK_TYPE), {
    enabled: !!networkName,
    onSuccess: ({ data }) => {
      const XData = data.data.map(i => {
        if (queryType === 'hour') {
          return String(parseInt(i.groupTime.slice(-2)));
        } else {
          return i.groupTime.slice(5, 10);
        }
      });
      // const treasuryData = data.data.map(i => parseFloat(i.treasuryValue));
      // setTreasuryData([...treasuryData]);

      setXData([...XData]);
    },
  });

  useEffect(() => {
    if (aRate && XData && ezE2LpRate) {
      setOption({
        series: [
          {
            name: (networkName ? ATokenMap[networkName] : '') + t('home.card.fundCost'),
            type: 'area',
            data: ezE2LpRate,
            color: '#008FFB',
          },
          {
            name: t('home.aRateAxis'),
            type: 'area',
            data: aRate,
            color: '#00E396',
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
              title: {
                text: (networkName ? ATokenMap[networkName] : '') + t('home.card.fundCost') + ' ( % ) ',
              },
              decimalsInFloat: 1,
              min: getYMin([...ezE2LpRate, ...aRate]),
              max: getYMax([...ezE2LpRate, ...aRate]),
            },
            {
              opposite: true,
              title: {
                text: t('home.aRateAxis') + ' ( % ) ',
              },
              decimalsInFloat: 1,
              min: getYMin([...ezE2LpRate, ...aRate]),
              max: getYMax([...ezE2LpRate, ...aRate]),
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (val: string, obj: any) {
                // if (obj.seriesIndex === 0) {
                return parseFloat(val).toFixed(2) + '%';
                // }
                // return val;
              },
            },
          },
        },
      });
    }
  }, [aRate, XData, ezE2LpRate]);

  return (
    <Card>
      <HomeCardHeader>
        <CardHeader title={t('home.card.fundCostTitle') + ''} />

        <RenderSelect value={queryType} onChange={setQueryType} />
      </HomeCardHeader>

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
