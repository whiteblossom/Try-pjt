import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // 차트 생성
    const chart = new Chart(ctx, {
      type: 'bar', // 차트 타입
      data: {
        labels: data.labels, // 라벨 데이터
        datasets: [
          {
            label: 'Percentage',
            data: data.values, // 차트에 표시할 데이터
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // 막대의 배경색
            borderColor: 'rgba(75, 192, 192, 1)', // 막대의 테두리 색
            borderWidth: 1, // 테두리 두께
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    return () => {
      // 컴포넌트 언마운트 시 차트 인스턴스 제거
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
