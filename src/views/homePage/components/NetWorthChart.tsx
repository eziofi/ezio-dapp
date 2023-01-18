import ReactECharts from 'echarts-for-react';
import { useQuery } from 'react-query';
import { queryTokenGroup, queryTotalNetWorth } from '../../../api/api';
import { useState } from 'react';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';

export default function NetWorthChart() {
  const [options, setOptions] = useState<any>(null);

  useQuery('queryTokenGroup', queryTokenGroup, {
    onSuccess: data => {
      const XData = data.data.data.map(i => parseInt(i.groupTime));
      const aNetWorth = data.data.data.map(i => i.ezatNetWorth);
      const bNetWorth = data.data.data.map(i => i.ezbtNetWorth);
      const aRate = data.data.data.map(i => i.ezatRate);

      setOptions({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: XData,
        },
        yAxis: [
          {
            name: t('home.netWorthAxis'),
            type: 'value',
            splitLine: {
              lineStyle: {
                color: '#787d91',
              },
            },
            splitNumber: 5,
            decimalsInFloat: 0,
            min: 0,
            max: getYMax([...bNetWorth, ...aNetWorth]),
            interval: getYMax([...bNetWorth, ...aNetWorth]) / 5,
          },
          {
            name: t('home.aRateAxis'),
            type: 'value',
            splitLine: {
              lineStyle: {
                color: '#787d91',
              },
            },
            splitNumber: 5,
            decimalsInFloat: 0,
            min: 0,
            max: getYMax(aRate),
            interval: getYMax(aRate) / 5,
          },
        ],
        grid: {
          left: '1%',
          right: '5%',
          bottom: '1%',
          containLabel: true,
        },
        legend: {
          data: [t('home.aNetWorthSeries'), t('home.bNetWorthSeries'), t('home.aRateAxis')],
          inactiveColor: 'rgba(50, 70, 100, 50)',
          textStyle: {
            color: 'rgba(120, 125, 145, 1)',
          },
        },
        series: [
          {
            name: t('home.aNetWorthSeries'),
            data: aNetWorth,
            type: 'line',
            yAxisIndex: 0,
            tooltip: {
              trigger: 'axis',
            },
          },
          {
            name: t('home.bNetWorthSeries'),
            data: bNetWorth,
            type: 'line',
            yAxisIndex: 0,
            tooltip: {
              trigger: 'axis',
            },
          },
          {
            name: t('home.aRateAxis'),
            data: aRate,
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              trigger: 'axis',
            },
          },
        ],
        padding: [0, 0, 0, 20],
      });
    },
  });
  return <>{options ? <ReactECharts option={options} /> : <></>}</>;
}
