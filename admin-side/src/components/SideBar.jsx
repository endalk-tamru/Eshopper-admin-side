import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LogoutIcon from "@mui/icons-material/Logout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupIcon from "@mui/icons-material/Group";

import { logout, clearAuthState } from "../features/auth/authSlice";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ openDrawer, DrawerHeader, handleDrawerClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const handleListItemClick = (event, index) => {
    user ? setSelectedIndex(index) : setSelectedIndex(0);
  };

  const onLogout = (event, index) => {
    setSelectedIndex(index);
    dispatch(logout());
    dispatch(clearAuthState());
    navigate("/login");
  };

  return (
    <Drawer variant="permanent" open={openDrawer}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List component="nav">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>

        <Link
          to="/products"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </Link>

        <Link
          to="/add-product"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItemButton>
        </Link>

        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </Link>

        <Link to="/orders" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <ShoppingCartCheckoutIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </Link>

        <Divider />
        {user && (
          <ListItemButton onClick={(event) => onLogout(event, 0)}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
