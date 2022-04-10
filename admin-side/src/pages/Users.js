import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import SecurityIcon from "@mui/icons-material/Security";

import useCalculateProfit from "../useCalculateProfit";
import GridData from "../components/GridData";
import WidgetItem from "../components/WidgetItem";
import DeleteModal from "../components/DeleteModal";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  userStats,
} from "../features/users/userSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { users, yearlyStats, monthlyStats, weeklyStats } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(userStats());
  }, [dispatch]);

  const userStat = useCalculateProfit(yearlyStats, monthlyStats, weeklyStats);

  const deleteItem = (id) => {
    dispatch(deleteUser(id));    
  };

  const toggleAdmin = (id) => {
    const findData = users.find((user) => user._id === id);
    const updatedData = { ...findData, isAdmin: !findData.isAdmin };
    dispatch(updateUser({ id, updatedData }));
  };

  const columns = [
    {
      field: "avator",
      headerName: "Username",
      hideable: false,
      width: 250,
      renderCell: (params) => (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={params.row.username.toUpperCase()}
                src=""
                sx={{ bgcolor: "#D19C97" }}
              />
            </ListItemAvatar>
            <ListItemText primary={params.row.username} />
          </ListItem>
        </List>
      ),
    },
    {
      field: "email",
      headerName: "Email",      
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Registered Date",
      type: "date",
      width: 150,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString("en-US");
      },
    },
    {
      field: "updatedAt",
      headerName: "Last Updated",
      type: "dateTime",
      width: 200,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString("en-US");
      },
    },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      width: 150,
      renderCell: (params) => (
        <Typography>
          {params.row.isAdmin ? (
            <CheckIcon color="success" />
          ) : (
            <ClearIcon color="error" />
          )}
        </Typography>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <DeleteModal
              deleteItem={() => deleteItem(params.row._id)}
              title={params.row.username}
            />
          }
          label="Delete"
        />,
        <GridActionsCellItem
          icon={<SecurityIcon />}
          label="Toggle Admin"
          onClick={() => toggleAdmin(params.row._id)}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 0, md: 3 }}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <WidgetItem
          bgColor="#651fff"
          title="This WEEK Registered Users"
          tooltip = "compared to last week"
          data={userStat.weeklyReport.currentData}
          profit={userStat.weeklyReport.profitInPercent.toFixed(2)}
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
          title="This YEAR Registered Users"
          tooltip = "compared to last year"
          data={userStat.yearlyReport.currentData}
          profit={userStat.yearlyReport.profitInPercent.toFixed(2)}
        />
      </Stack>

      <GridData rows={users} columns={columns} />
    </Stack>
  );
}
