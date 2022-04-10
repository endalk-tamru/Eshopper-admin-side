import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./pages/EditProduct";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D19C97",
    },
  },
});

function App() {
  const { user } = useSelector((state) => state.auth);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <Box>
          <CssBaseline />
          <NavBar openDrawer={openDrawer} handleDrawerOpen={handleDrawerOpen} />

          <SideBar
            openDrawer={openDrawer}
            DrawerHeader={DrawerHeader}
            handleDrawerClose={handleDrawerClose}
          />

          <Box component="main" sx={{ flexGrow: 1, p: 3, pl: 10 }}>
            <DrawerHeader />
            <Routes>
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                element={
                  <ProtectedRoute
                    isAuthenticated={user}
                    isAdmin={user?.isAdmin}
                  />
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/users" element={<Users />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
