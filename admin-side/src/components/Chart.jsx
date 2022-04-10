import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { incomeStats } from "../features/orders/orderSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Chart() {
  const dispatch = useDispatch();
  const { monthlyStats } = useSelector((state) => state.orders);
  const [incomeChart, setIncomeChart] = useState({
    datasets: [],
  });

  useEffect(() => {
    dispatch(incomeStats());
  }, [dispatch]);

  useEffect(() => {
    const chartData = () => {
      setIncomeChart({
        labels: monthlyStats.map((stats) => MONTHS[stats._id - 1]),
        datasets: [
          {
            label: "Sales",
            data: monthlyStats.map((stats) => stats.total),
            backgroundColor: "rgba(103, 58, 183, 1)",
            borderColor: "rgba(103, 58, 183, 0.6)",
            borderWidth: 2,
            tension: 0.2,
          },
        ],
      });
    };

    if (monthlyStats) {
      chartData();
    }
  }, [monthlyStats]);

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <Box
      sx={{
        // display: { xs: "none", sm: "block" },
        height: { xs: 300, sm: 330 },
        width: "100%",
      }}
    >
      <Line data={incomeChart} options={options} />
    </Box>
  );
}
