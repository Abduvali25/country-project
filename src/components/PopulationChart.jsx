import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PopulationChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getItem = localStorage.getItem("selectedCountry");
        const countries = JSON.parse(getItem);

        const labels = countries.map((country) => country.name);
        const populations = countries.map((country) => country.population);

        setData({
          labels,
          datasets: [
            {
              label: "Population",
              data: populations,
              fill: true,
              borderColor: "#0ea5e9",
              backgroundColor: "white",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full mr-10">
      <h2 className="text-center font-bold"> Population by Selected Country</h2>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.raw.toLocaleString()}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Country",
              },
            },
            y: {
              title: {
                display: true,
                text: "Population",
              },
              ticks: {
                callback: function (value) {
                  return value.toLocaleString();
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PopulationChart;
