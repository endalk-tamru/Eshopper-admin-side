import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  messages: "",
  numOfUnSeenMsg: 0
};

export const fetchMessages = createAsyncThunk(
  "contacts/fetchMessages",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await contactService.fetchMessages(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateSeenMessages = createAsyncThunk(
  "contacts/updateSeenMessages",
  async (isSeen, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await contactService.updateSeenMessages(token, isSeen);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const unSeenMessages = createAsyncThunk(
  "contacts/unSeenMessages",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await contactService.unSeenMessages(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState,  
  extraReducers: {
    [fetchMessages.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.messages = action.payload;
    },
    [fetchMessages.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload.errMsg;
    },
    [updateSeenMessages.pending]: (state) => {
      state.isLoading = true;
    },
    [updateSeenMessages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.messages = action.payload;
    },
    [updateSeenMessages.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload.errMsg;
    },
    [unSeenMessages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.numOfUnSeenMsg = action.payload;
    }    
  },
});

export default contactSlice.reducer;
