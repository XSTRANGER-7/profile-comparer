import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ReactLoading from 'react-loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComparisonCharts = ({ comparisonData }) => {
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
      ...compareData.map(data => ({
        label: data.username,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [data.stars, data.prs, data.repos],
      })),
    ],
  };
 
  const tableRows = compareData.flatMap((data) => {
    const languages = data.languages || {};
    return Object.entries(languages).map(([lang, lines]) => (
      <tr key={lang}>
        <td className="py-2 px-4 border-b">{data.username}</td>
        <td className="py-2 px-4 border-b">{lang}</td>
        <td className="py-2 px-4 border-b">{lines}</td>
      </tr>
    ));
  });

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <div className="relative h-80">
        <Bar data={chartData} options={options} />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Tech Stack Comparison</h2>
        <table className="min-w-full bg-white border border-gray-300 mt-2">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Profile</th>
              <th className="py-2 px-4 border-b">Language</th>
              <th className="py-2 px-4 border-b">Lines of Code</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.length > 0 ? tableRows : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonCharts;
