import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("userInfo")) || null,
};

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.userLogin(userData);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      state.isLoading = false;
      state.isSuccess = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [userLogin.rejected]: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      state.isLoading = false;
      state.token = null;
      state.user = null;
      state.isError = true;
      state.errorMsg = action.payload.errMsg;
    },
    [logout.fulfilled]: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
