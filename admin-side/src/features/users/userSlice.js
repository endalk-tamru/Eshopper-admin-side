import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  users: [],
  yearlyStats: [],
  monthlyStats: [],
  weeklyStats: [],
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (newUsersQuery = "", thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.fetchUsers(token, newUsersQuery);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.updateUser(updatedData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.deleteUser(id, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const userStats = createAsyncThunk(
  "users/userStats",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.userStats(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {      
      state.isError = true;
      state.errorMsg = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      state.users[index] = { ...state.users[index], ...action.payload };
    },
    [updateUser.rejected]: (state, action) => {
      state.isError = true;
      state.errorMsg = action.payload;
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = state.users.filter(
        (user) => user._id !== action.payload.id
      );
    },
    [deleteUser.rejected]: (state, action) => {
      state.isError = true;
      state.errorMsg = action.payload;
    },
    [userStats.pending]: (state) => {
      state.isLoading = true;
    },
    [userStats.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.yearlyStats = action.payload.yearlyStats;
      state.monthlyStats = action.payload.monthlyStats;
      state.weeklyStats = action.payload.weeklyStats;
    },
    [userStats.rejected]: (state, action) => {
      state.isError = true;
      state.errorMsg = action.payload;
    },
  },
});

export default userSlice.reducer;
