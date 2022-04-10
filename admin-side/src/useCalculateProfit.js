import { useState, useEffect } from "react";
import { weekNumber } from "weeknumber";

const date = new Date();
const yearNum = date.getFullYear();
const monthNum = date.getMonth() + 1;
const weekNum = weekNumber(date);

const calculateProfit = (statData, dateNum, state) => {
  statData.map((stat) => {
    if (stat._id === dateNum) {
      state((prevState) => ({
        ...prevState,
        currentData: stat.total,
      }));
    }

    if (stat._id === dateNum - 1)
      state((prevState) => ({
        ...prevState,
        previousData: stat.total,
      }));
  });

  state((prevState) => ({
    ...prevState,
    profitInPercent: prevState.previousData
      ? ((prevState.currentData - prevState.previousData) /
          prevState.previousData) *
        100
      : !prevState.currentData
      ? 0.0
      : 100,
  }));
};

export default function useCalculateProfit(
  yearlyStats,
  monthlyStats,
  weeklyStats
) {
  const [yearlyReport, setYearlyReport] = useState({
    currentData: 0,
    previousData: 0,
    profitInPercent: 0,
  });
  const [monthlyReport, setMonthlyReport] = useState({
    currentData: 0,
    previousData: 0,
    profitInPercent: 0,
  });
  const [weeklyReport, setWeeklyReport] = useState({
    currentData: 0,
    previousData: 0,
    profitInPercent: 0,
  });

  useEffect(() => {
    calculateProfit(yearlyStats, yearNum, setYearlyReport);
    calculateProfit(monthlyStats, monthNum, setMonthlyReport);
    calculateProfit(weeklyStats, weekNum, setWeeklyReport);
  }, [yearlyStats, monthlyStats, weeklyStats]);

  return { yearlyReport, monthlyReport, weeklyReport };
}
