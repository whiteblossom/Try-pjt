import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data, chartType }) => {
  // 차트를 렌더링할 캔버스 엘리먼트에 대한 참조
  const chartRef = useRef(null);

  // 데이터의 최대값 계산
  const maxValue = Math.max(...data.values);

  useEffect(() => {
    // 캔버스의 2D 렌더링 컨텍스트를 가져옴
    const ctx = chartRef.current.getContext('2d');

    // 차트 인스턴스 생성
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

    // 컴포넌트가 언마운트될 때 차트 인스턴스 제거
    return () => {
      chart.destroy();
    };
  }, [data, chartType]);

  // 렌더링할 캔버스 엘리먼트 반환
  return <canvas ref={chartRef} />;
};

export default ChartComponent;
