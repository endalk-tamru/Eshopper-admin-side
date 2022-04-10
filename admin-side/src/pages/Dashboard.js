import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import useCalculateProfit from "../useCalculateProfit";
import WidgetItem from "../components/WidgetItem";
import Chart from "../components/Chart";
import NewUsers from "../components/NewUsers";
import { incomeStats } from "../features/orders/orderSlice";
import { userStats } from "../features/users/userSlice";
import {
  productSoldStats,
  clearProductState,
} from "../features/products/productSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const users = useSelector((state) => state.users);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(incomeStats());
    dispatch(userStats());
    dispatch(productSoldStats());

    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch]);

  const orderStat = useCalculateProfit(
    orders.yearlyStats,
    orders.monthlyStats,
    orders.weeklyStats
  );

  const userStat = useCalculateProfit(
    users.yearlyStats,
    users.monthlyStats,
    users.weeklyStats
  );

  const productSoldStat = useCalculateProfit(
    products.yearlyStats,
    products.monthlyStats,
    products.weeklyStats
  );

  return (
    <Stack spacing={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 0, md: 3 }}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <WidgetItem
          bgColor="#651fff"
          title="This MONTH Income"
          tooltip = "compared to last month"
          data={`$${orderStat.monthlyReport.currentData.toFixed(2)}`}
          profit={orderStat.monthlyReport.profitInPercent.toFixed(2)}
        />

        <WidgetItem
          bgColor="#65afff"
          title="This MONTH Registered Users"
          tooltip = "compared to last month"
          data={userStat.monthlyReport.currentData}
          profit={userStat.monthlyReport.profitInPercent.toFixed(2)}
        />

        <WidgetItem
          bgColor="#1de9b6"
          title="This MONTH Product Sold"
          tooltip = "compared to last month"
          data={productSoldStat.monthlyReport.currentData}
          profit={productSoldStat.monthlyReport.profitInPercent.toFixed(2)}
        />
      </Stack>

      <Grid container spacing={{ xs: 0, md: 1 }}>
        <Grid item xs={12} sm={7} md={8}>
          <Chart />
        </Grid>
        <Grid item xs={12} sm={5} md={4} sx={{ mt: {xs:2, sm: 0}}}>
          <NewUsers />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Dashboard;
