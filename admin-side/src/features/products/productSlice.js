import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import orderService from "../orders/orderService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isProductSaved: false,
  isError: false,
  errorMsg: "",
  products: [],
  yearlyStats: [],
  monthlyStats: [],
  weeklyStats: [],
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productService.createProduct(productData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.fetchProducts();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      return await productService.fetchProductById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productService.updateProduct(updatedData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productService.deleteProduct(id, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const productSoldStats = createAsyncThunk(
  "products/productSoldStats",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.productSoldStats(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductState: (state) => initialState,
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isProductSaved = true;
      state.products.push(action.payload);
    },
    [createProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isProductSaved = false;
      state.isError = true;
      state.errorMsg = action.payload.errMsg;
    },
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    [fetchProductById.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProductById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
    },
    [fetchProductById.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;      
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.products[index] = { ...state.products[index], ...action.payload };
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isProductSaved = false;
      state.isError = true;
      state.errorMsg = action.payload.errMsg;
    },
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = state.products.filter(
        (product) => product._id !== action.payload.id
      );
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    [productSoldStats.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.yearlyStats = action.payload.yearlyStats;
      state.monthlyStats = action.payload.monthlyStats;
      state.weeklyStats = action.payload.weeklyStats;
    },
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
