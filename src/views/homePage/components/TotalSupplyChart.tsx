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
      const aTotalSupply = data.data.data.map(i => i.ezatSupply);
      const bTatalSupply = data.data.data.map(i => i.ezbtSupply);

      const totalSupplyMax = getYMax([...aTotalSupply, ...aTotalSupply]);

      setOptions({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: XData,
        },
        yAxis: [
          {
            name: t('home.totalSupplyAxis'),
            type: 'value',
            splitLine: {
              lineStyle: {
                color: '#787d91',
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
          data: [t('home.aTotalSupplySeries'), t('home.bTotalSupplySeries')],
          inactiveColor: 'rgba(50, 70, 100, 50)',
          textStyle: {
            color: 'rgba(120, 125, 145, 1)',
          },
        },
        series: [
          {
            name: t('home.aTotalSupplySeries'),
            data: aTotalSupply,
            type: 'line',
            yAxisIndex: 0,
          },
          {
            name: t('home.bTotalSupplySeries'),
            data: bTatalSupply,
            type: 'line',
            yAxisIndex: 0,
          },
        ],
        padding: [0, 0, 0, 20],
      });
    },
  });
  return <>{options ? <ReactECharts option={options} /> : <></>}</>;
}
