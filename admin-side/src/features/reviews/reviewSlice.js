import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  reviewQty: 0,
  reviewInfo: [],
};

export const fetchReviews = createAsyncThunk(
  "products/fetchReviews",
  async (_, thunkAPI) => {
    try {
      return await reviewService.fetchReviews();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchReviewsById = createAsyncThunk(
  "products/fetchReviewsById",
  async (id, thunkAPI) => {
    try {
      return await reviewService.fetchReviewsById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewState: (state) => initialState,
  },
  extraReducers: {
    [fetchReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchReviews.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.reviewInfo = action.payload;
    },
    [fetchReviews.rejected]: (state, action) => {
      state.isError = true;
      state.errorMsg = action.payload;
    },
    [fetchReviewsById.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchReviewsById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.reviewInfo = action.payload;
      state.reviewQty = action.payload.reviews.length;
    },
    [fetchReviewsById.rejected]: (state, action) => {
      state.isError = true;
      state.errorMsg = action.payload;
    },
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
