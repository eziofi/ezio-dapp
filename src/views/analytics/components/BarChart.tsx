import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import RenderSkeleton from '../../homePage/components/RenderSkeleton';
import { Card, CardHeader } from '@mui/material';
import { t } from 'i18next';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';

export default function BarChart() {
  const [option, setOption] = React.useState<any>(null);
  const theme = useTheme();

  useEffect(() => {
    setOption({
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
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
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
          title: {
            text: '$ (thousands)',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val: string) {
              return '$ ' + val + ' thousands';
            },
          },
        },
      },
    });
  }, []);

  return (
    <Card>
      <CardHeader title="手续费" />

      <Box dir="ltr" sx={{ p: `0 ${theme.spacing(3)} 0 ${theme.spacing(3)}` }}>
        {option ? (
          <ReactApexChart options={option.options} series={option.series} type="bar" height={350} />
        ) : (
          <RenderSkeleton />
        )}
      </Box>
    </Card>
  );
}
