import ReactECharts from 'echarts-for-react';
import { useQuery } from 'react-query';
import { queryTotalNetWorth } from '../../../api/api';
import { useState } from 'react';
import { t } from 'i18next';
import { getYMax } from '../../wallet/helpers/utilities';

export default function MarketChart() {
  const [options, setOptions] = useState<any>(null);

  useQuery('queryTotalNetWorth', queryTotalNetWorth, {
    onSuccess: data => {
      const XData = data.data.data.map(i => parseInt(i.groupTime));
      const treasuryData = data.data.data.map(i => i.totalNetWorth);
      const ethData = data.data.data.map(i => i.ethPrice);

      setOptions({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: XData,
        },
        yAxis: [
          {
            name: t('home.treasuryValue'),
            type: 'value',
            splitNumber: 5,
            min: 0,
            max: getYMax(treasuryData),
            interval: getYMax(treasuryData) / 5,
            splitLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
          },
          {
            name: t('home.ethPrice'),
            type: 'value',
            splitNumber: 5,
            min: 0,
            max: getYMax(ethData),
            interval: getYMax(ethData) / 5,
            splitLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
          },
        ],
        grid: {
          left: '1%',
          right: '5%',
          bottom: '1%',
          containLabel: true,
        },
        legend: {
          data: [t('home.treasuryValue'), t('home.ethPrice')],
          inactiveColor: 'rgba(50, 70, 100, 50)',
          textStyle: {
            color: 'rgba(120, 125, 145, 1)',
          },
        },
        series: [
          {
            name: t('home.treasuryValue'),
            data: treasuryData,
            type: 'line',
            yAxisIndex: 0,
            tooltip: {
              trigger: 'axis',
            },
          },
          {
            name: t('home.ethPrice'),
            data: ethData,
            type: 'line',
            yAxisIndex: 1,
          },
        ],
      });
    },
  });
  return <>{options ? <ReactECharts option={options} style={{ paddingLeft: '20px' }} /> : <></>}</>;
}
