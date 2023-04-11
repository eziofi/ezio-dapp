import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import RenderSkeleton from '../../homePage/components/RenderSkeleton';
import { Card, CardHeader } from '@mui/material';
import { t } from 'i18next';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { queryAccumulatedFees, queryDailyAccumulatedFees } from '../../../api/api';
import { ColorModeContext } from '../../../theme';
import { getDecimal, getYMax } from '../../wallet/helpers/utilities';
import useWallet from '../../../hooks/useWallet';
import { NETWORK_TYPE } from '../../wallet/helpers/constant';

export default function BarChart() {
  const [option, setOption] = React.useState<any>(null);
  const { mode } = React.useContext(ColorModeContext);
  const [DailyAccumulatedFees, setDailyAccumulatedFees] = React.useState<number[] | null>(null);
  const [AccumulatedFees, setAccumulatedFees] = React.useState<number[] | null>(null);
  const [XData, setXData] = React.useState<string[] | null>(null);

  const { networkName } = useWallet();

  useQuery(['queryDailyAccumulatedFees'], () => queryDailyAccumulatedFees(networkName as NETWORK_TYPE), {
    enabled: !!networkName,
    onSuccess: ({ data }) => {
      setDailyAccumulatedFees(data.data.map(i => i.dailyAccumulatedFees));
      setXData(data.data.map(i => i.groupTime.substring(5)));
    },
  });

  useQuery(['queryAccumulatedFees'], () => queryAccumulatedFees(networkName as NETWORK_TYPE), {
    enabled: !!networkName,
    onSuccess: ({ data }) => {
      setAccumulatedFees(data.data.map(i => i.accumulatedFees));
    },
  });

  useEffect(() => {
    if (DailyAccumulatedFees && AccumulatedFees) {
      setOption({
        series: [
          {
            name: t('analytics.everyday'),
            data: DailyAccumulatedFees,
            type: 'column',
            color: '#008FFB',
          },
          {
            name: t('analytics.accumulativeTotal'),
            data: AccumulatedFees,
            type: 'line',
            color: '#00E396',
          },
        ],
        options: {
          theme: {
            mode,
          },
          chart: {
            height: 350,
            toolbar: {
              show: false,
            },
            background: 'transparent',
            zoom: {
              enabled: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
            width: [3, 3],
          },
          markers: {
            size: 2,
            colors: ['#008FFB', '#00E396'],
            strokeColors: ['#008FFB', '#00E396'],
          },
          fill: {
            type: 'solid',
            opacity: 1,
          },
          labels: XData,
          yaxis: [
            {
              title: {
                text: t('analytics.everyday'),
              },
              decimalsInFloat: getDecimal(DailyAccumulatedFees as number[]),
              min: 0,
              max: getYMax(DailyAccumulatedFees as number[]),
            },
            {
              opposite: true,
              title: {
                text: t('analytics.accumulativeTotal'),
              },
              decimalsInFloat: getDecimal(DailyAccumulatedFees as number[]),
              min: 0,
              max: getYMax(AccumulatedFees as number[]),
            },
          ],
          tooltip: {
            y: {
              formatter: function (val: string) {
                return parseFloat(val).toFixed(2);
              },
            },
          },
        },
      });
    }
  }, [DailyAccumulatedFees, AccumulatedFees]);

  return (
    <Card>
      <CardHeader title={t('analytics.CommissionDetail') as string} />

      <Box dir="ltr">
        {option ? <ReactApexChart options={option.options} series={option.series} height={350} /> : <RenderSkeleton />}
      </Box>
    </Card>
  );
}
