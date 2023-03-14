import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import RenderSkeleton from '../../homePage/components/RenderSkeleton';
import { Card, CardHeader } from '@mui/material';
import { t } from 'i18next';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { queryAccumulatedFees, queryDailyAccumulatedFees } from '../../../api/api';
import { ColorModeContext } from '../../../theme';
import { getDecimal, getYMax } from '../../wallet/helpers/utilities';

export default function BarChart() {
  const [option, setOption] = React.useState<any>(null);
  const theme = useTheme();
  const { mode } = React.useContext(ColorModeContext);
  const [DailyAccumulatedFees, setDailyAccumulatedFees] = React.useState<number[]>([]);
  const [AccumulatedFees, setAccumulatedFees] = React.useState<number[]>([]);
  const [XData, setXData] = React.useState<string[]>([]);

  useQuery(['queryDailyAccumulatedFees'], queryDailyAccumulatedFees, {
    onSuccess: ({ data }) => {
      setDailyAccumulatedFees(data.data.map(i => i.dailyAccumulatedFees));
      setXData(data.data.map(i => i.groupTime.substring(5)));
    },
  });

  useQuery(['queryAccumulatedFees'], queryAccumulatedFees, {
    onSuccess: ({ data }) => {
      setAccumulatedFees(
        data.data.map(i => {
          return !!i.accumulatedFees ? i.accumulatedFees : Math.max(...data.data.map(i => i.accumulatedFees));
        }),
      );
    },
  });
  // console.log('🚀 ~ file: BarChart.tsx:17 ~ BarChart ~ data:', AccumulatedFees);

  useEffect(() => {
    setOption({
      series: [
        {
          name: t('analytics.everyday'),
          data: DailyAccumulatedFees,
          type: 'column',
        },
        {
          name: t('analytics.accumulativeTotal'),
          data: AccumulatedFees,
          type: 'line',
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
          width: [4, 4],
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
            decimalsInFloat: getDecimal(DailyAccumulatedFees),
            min: 0,
            max: getYMax(DailyAccumulatedFees),
          },
          {
            opposite: true,
            title: {
              text: t('analytics.accumulativeTotal'),
            },
            decimalsInFloat: getDecimal(DailyAccumulatedFees),
            min: 0,
            max: getYMax(AccumulatedFees),
          },
        ],
        tooltip: {
          y: {
            formatter: function (val: string) {
              return val;
            },
          },
        },
      },
    });
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
