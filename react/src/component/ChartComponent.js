
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data, chartType }) => {
  const chartRef = useRef(null);

  const maxValue = Math.max(...data.values);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart =
      chartType === 'bar'
        ? new Chart(ctx, {
            type: 'bar',
            data: {
              labels: data.labels,
              datasets: [
                {
                  label: '연령대 비율',
                  data: data.values,
                  backgroundColor: 'rgba(75, 137, 220, 0.2)',
                  borderColor: 'rgba(75, 137, 220, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,
                  max:  maxValue + 2,
                  grid: {
                    display: false,
                  },
                },
              },
            },
          })
        : new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['남성','여성'],
              datasets: [
                {
                  data: data.values, 
                  backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                  borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                  borderWidth: 1,
                },
              ],
            },
          });
    return () => {
      // 컴포넌트 언마운트 시 차트 인스턴스 제거
      chart.destroy();
    };
  }, [data, chartType]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
