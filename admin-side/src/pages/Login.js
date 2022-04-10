import Box from "@mui/material/Box";

import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Box
      sx={{       
        display: "flex",
        justifyContent: "center",
        "& > :not(style)": {
          width: 400,
          height: 400,
        },
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default Login;
