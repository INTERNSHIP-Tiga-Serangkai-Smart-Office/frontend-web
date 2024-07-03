import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Async thunk to handle user login
export const LoginAuth = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post("http://192.168.35.80:5000/login", {
      email: user.email,
      password: user.password,
    });
    // Assuming your response includes an accessToken
    const { accessToken } = response.data;

    // Save the accessToken in localStorage (optional) or Redux state
    localStorage.setItem("accessToken", accessToken);

    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

// Async thunk to fetch user data after successful login
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    // Get the accessToken from localStorage or Redux state
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get("http://192.168.35.80:5000/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

// Async thunk to handle user logout
export const LogOut = createAsyncThunk("user/LogOut", async () => {
  // Clear the accessToken from localStorage or Redux state upon logout
  localStorage.removeItem("accessToken");

  await axios.delete("http://192.168.35.80:5000/logout");
});

// Create the auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(LogOut.fulfilled, (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
    });
  },
});

// Export actions and reducer
export const { reset } = authSlice.actions;
export default authSlice.reducer;
