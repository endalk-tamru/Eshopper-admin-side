import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  successMsg: null,
  errorMsg: "",
  orders: [],
  yearlyStats: [],
  monthlyStats: [],
  weeklyStats: [],
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.fetchOrders(token);
    } catch (err) {
      return thunkAPI.axiosrejectWithValue(err.response.data);
    }
  }
);

export const incomeStats = createAsyncThunk(
  "orders/incomeStats",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.incomeStats(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orders = action.payload;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload.errMsg;
    },
    [incomeStats.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.yearlyStats = action.payload.yearlyStats;
      state.monthlyStats = action.payload.monthlyStats;
      state.weeklyStats = action.payload.weeklyStats;
    },
  },
});

export default orderSlice.reducer;
