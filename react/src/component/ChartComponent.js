// ChartComponent.jsx

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data, chartType }) => {
  const chartRef = useRef(null);

  // 데이터가 비어 있는 경우 0으로 초기화
  if (!data.values) {
    data.values = Array(data.labels.length).fill(0);
  }

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // 차트 생성
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
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,
                  max: 10,
                  grid: {
                    display: false, // y-축 격자 표시 여부
                  },
                },
              },
            },
          })
        : new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['여성', '남성'],
              datasets: [
                {
                  data: data.values, 
                  backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                  borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
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
