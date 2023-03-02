import { FC } from 'react';
import Chart from 'react-apexcharts';

import { TData } from '../types/types';

interface props {
  data: TData[]
}

const Charts: FC<props> = ({ data }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'BTCUSDT',
      align: 'left'
    },
    xaxis: {
      categories: data.map((val) => {
        const t = val.time;
        return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
      })
    }
  };

  const series: ApexAxisChartSeries = [{
    name: "close-price",
    data: data.map((val) => parseFloat(val.closePrice))
  }];

  return (
    <Chart options={options} series={series} type="line" width='100%' />
  );
};

export default Charts;