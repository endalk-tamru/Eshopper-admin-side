import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { unSeenMessages } from "../features/contacts/contactSlice";

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavBar = ({ openDrawer, handleDrawerOpen }) => {  
  const dispatch = useDispatch()
  const { numOfUnSeenMsg, messages } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(unSeenMessages())
  }, [dispatch, messages])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(openDrawer && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{              
              ...(openDrawer && { display: {xs: "none", sm: "block"} }),
            }}
          >
            <Link to="/" style={{ color: "inherit", textDecoration: "none", fontFamily: "inherit" }}>Eshopper</Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <Link
              to="/contact"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={numOfUnSeenMsg} color="secondary">                  
                  <MailIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>        
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
