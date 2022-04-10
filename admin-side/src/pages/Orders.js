import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import useCalculateProfit from "../useCalculateProfit";
import GridData from "../components/GridData";
import WidgetItem from "../components/WidgetItem";
import { fetchOrders, incomeStats } from "../features/orders/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, yearlyStats, monthlyStats, weeklyStats } = useSelector(
    (state) => state.orders
  );  

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(incomeStats());
  }, [dispatch]);

  const orderStat = useCalculateProfit(yearlyStats, monthlyStats, weeklyStats);

  const columns = [
    {
      field: "customerId",
      headerName: "Customer ID",
      width: 200,
    },
    {
      field: "customer",
      headerName: "Customer",
      hideable: false,
      width: 200,
      renderCell: (params) => (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={params.row.customerName.toUpperCase()}
                src="img"
                sx={{ bgcolor: "#D19C97" }}
              />
            </ListItemAvatar>
            <ListItemText primary={params.row.customerName} />
          </ListItem>
        </List>
      ),
    },
    {
      field: "customerEmail",
      headerName: "Email",
      width: 200,
    },
    {
      field: "productName",
      headerName: "Product",
      width: 200,
      renderCell: (params) => (
        <List>
          <ListItem>
            <ListItemText primary={params.row.productName} />
          </ListItem>
        </List>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      width: 120,
    },
    {
      field: "productTotalAmount",
      headerName: "Total Amount",
      type: "number",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Qty",
      type: "number",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Ordered Date",
      type: "date",
      width: 170,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString("en-US");
      },
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 150,
    },
  ];

  return (
    <Stack spacing={5}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 0, md: 3 }}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <WidgetItem
          bgColor="#651fff"
          title="This WEEK Income"
          tooltip = "compared to last week"
          data={`$${orderStat.weeklyReport.currentData.toFixed(2)}`}
          profit={orderStat.weeklyReport.profitInPercent.toFixed(2)}
        />

        <WidgetItem
          bgColor="#65afff"
          title="This MONTH Income"
          tooltip = "compared to last month"
          data={`$${orderStat.monthlyReport.currentData.toFixed(2)}`}
          profit={orderStat.monthlyReport.profitInPercent.toFixed(2)}
        />
        <WidgetItem
          bgColor="#1de9b6"
          title="This YEAR Income"
          tooltip = "compared to last year"
          data={`$${orderStat.yearlyReport.currentData.toFixed(2)}`}
          profit={orderStat.yearlyReport.profitInPercent.toFixed(2)}
        />
      </Stack>

      <GridData
        rows={orders}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              customerId: false,
              customerEmail: false,
            },
          },
        }}
      />
    </Stack>
  );
}
