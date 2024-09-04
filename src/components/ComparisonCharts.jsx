
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  } from 'chart.js';
  
  
  
import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

const ComparisonCharts = ({ comparisonData }) => {
  const chartRef = useRef(null);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    // Cleanup: Destroy the chart instance before creating a new one
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [comparisonData]);

  const { profileData, compareData } = comparisonData;

  const chartData = {
    labels: ['Stars', 'PRs', 'Repositories'],
    datasets: [
      {
        label: profileData.username,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [profileData.stars, profileData.prs, profileData.repos],
      },
      {
        label: compareData.username,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [compareData.stars, compareData.prs, compareData.repos],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default ComparisonCharts;
