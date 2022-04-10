import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { userLogin, clearAuthState } from "../features/auth/authSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, errorMsg, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      navigate("/");
    }

    dispatch(clearAuthState());
  }, [isSuccess, user, navigate, dispatch]);

  const handleLogin = () => {
    dispatch(userLogin({ email, password, loginAsAnAdmin: true }));
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: { xs: 2, sm: 4 }, paddingTop: { xs: 6 } }}
    >
      <Stack alignItems="center" spacing={4}>
        <Typography variant="h5" component="h4">
          Login
        </Typography>

        {isError && (
          <Typography variant="body1" component="p" color="error">
            {errorMsg}
          </Typography>
        )}

        <TextField
          fullWidth
          type="email"
          label="Email - admin@gmail.com"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Password - admin"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth                    
          variant="contained"          
          onClick={handleLogin}
          disabled={isLoading}
        >
          Login
        </Button>
      </Stack>
    </Paper>
  );
}
