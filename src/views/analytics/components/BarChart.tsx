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
import useWallet from '../../hooks/useWallet';
import { NETWORK_TYPE } from '../../wallet/helpers/constant';

export default function BarChart() {
  const [option, setOption] = React.useState<any>(null);
  const theme = useTheme();
  const { mode } = React.useContext(ColorModeContext);
  const [DailyAccumulatedFees, setDailyAccumulatedFees] = React.useState<number[]>([]);
  const [AccumulatedFees, setAccumulatedFees] = React.useState<number[]>([]);
  const [XData, setXData] = React.useState<string[]>([]);

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

    // setOption({
    //   series: [
    //     {
    //       name: 'PRODUCT A',
    //       data: DailyAccumulatedFees,
    //       type: 'column',
    //     },
    //     {
    //       name: 'PRODUCT B',
    //       data: AccumulatedFees,
    //       type: 'line',
    //     },
    //   ],
    //   options: {
    //     theme: {
    //       mode,
    //     },
    //     chart: {
    //       type: 'area',
    //       // stacked: false,
    //       height: 350,
    //       zoom: {
    //         enabled: false,
    //       },
    //     },
    //     dataLabels: {
    //       enabled: false,
    //     },
    //     markers: {
    //       size: 0,
    //     },
    //     fill: {
    //       type: 'gradient',
    //       gradient: {
    //         shadeIntensity: 1,
    //         inverseColors: false,
    //         opacityFrom: 0.45,
    //         opacityTo: 0.05,
    //         stops: [20, 100, 100, 100],
    //       },
    //     },
    //     yaxis: [
    //       {
    //         title: {
    //           text: t('analytics.everyday'),
    //         },
    //         decimalsInFloat: getDecimal(DailyAccumulatedFees),
    //         min: 0,
    //         max: getYMax(DailyAccumulatedFees),
    //       },
    //       {
    //         opposite: true,
    //         title: {
    //           text: t('analytics.accumulativeTotal'),
    //         },
    //         decimalsInFloat: getDecimal(DailyAccumulatedFees),
    //         min: 0,
    //         max: getYMax(AccumulatedFees),
    //       },
    //     ],
    //     title: {
    //       text: 'Irregular Data in Time Series',
    //       align: 'left',
    //       offsetX: 14,
    //     },
    //     // tooltip: {
    //     // shared: true,
    //     // },
    //     tooltip: {
    //       y: {
    //         formatter: function (val: string) {
    //           return val;
    //         },
    //       },
    //     },
    //     legend: {
    //       position: 'top',
    //       horizontalAlign: 'right',
    //       offsetX: -10,
    //     },
    //   },
    // });
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
