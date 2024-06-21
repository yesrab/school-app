import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
const DonutGraph = ({ gender }) => {
  const data = {
    labels: gender?.genderArray.map((data) => data.label),
    datasets: [
      {
        label: "Count",
        data: gender.genderArray.map((data) => data.value),
        borderRadius: 12,
      },
    ],
  };
  const options = {
    maintainAspectRatio: true,
    responsive: true,
    borderWidth: 3,
    plugins: {
      title: {
        text: "Total Gender count:",
        display: true,
        align: "start",
        font: {
          weight: "bold",
          size: 30,
        },
      },
    },
    cutout: 90,
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutGraph;
