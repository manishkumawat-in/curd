import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginHandler = createAsyncThunk(
  "auth/login",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { mobile: info.mobile, password: info.password },
        { withCredentials: true }
      );
      if (!data.success) {
        return thunkAPI.rejectWithValue(`Server error: ${data.message}`);
      }
      console.log(data);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`Client error: ${err.message}`);
    }
  }
);

export const signUpHandler = createAsyncThunk(
  "auth/signup",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        { name: info.name, mobile: info.mobile, password: info.password },
        { withCredentials: true }
      );

      if (!data.success) {
        return thunkAPI.rejectWithValue(`Server error: ${data.message}`);
      }
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`Client error: ${err.message}`);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") == "true" || false,
    isAdmin: localStorage.getItem("isAdmin") == "true" || false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUpHandler.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        alert(action.payload.message);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("isAdmin", false);
      })
      .addCase(signUpHandler.rejected, (state, action) => {
        console.log(action.payload.message);
        alert(action.payload.message);
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        alert(action.payload.message);
        window.localStorage.setItem("isLoggedIn", true);
        if (action.payload.userData.role == "admin") {
          state.isAdmin = true;
          localStorage.setItem("isAdmin", true);
        } else {
          localStorage.setItem("isAdmin", false);
        }
      })
      .addCase(loginHandler.rejected, (state, action) => {
        console.log(action.payload);
        alert(action.payload);
      });
  },
});


export default authSlice.reducer;
