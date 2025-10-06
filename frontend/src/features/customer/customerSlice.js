import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCustomers = createAsyncThunk(
  "customers/data",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/get`,
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

export const deleteHandler = createAsyncThunk(
  "customers/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/delete/${id}`,
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

export const add = createAsyncThunk("customers/add", async (info, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/add`,
      {
        name: info.name,
        contact: info.contact,
      },
      { withCredentials: true }
    );

    if (!data.success) {
      return thunkAPI.rejectWithValue(`Server error: ${data.message}`);
    }
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(`Client error: ${err.message}`);
  }
});

export const update = createAsyncThunk(
  "customers/update",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update/${info.id}`,
        { name: info.name, contact: info.contact },
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

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customersData: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customersData = action.payload.customers;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        alert(action.payload);
        console.log(action.payload);
      })
      .addCase(deleteHandler.fulfilled, (state, action) => {
        alert(action.payload.message);
      })
      .addCase(deleteHandler.rejected, (state, action) => {
        alert(action.payload);
        console.log(action.payload);
      })
      .addCase(add.fulfilled, (state, action) => {
        alert(action.payload.message);
      })
      .addCase(add.rejected, (state, action) => {
        alert(action.payload);
        console.log(action.payload);
      })
      .addCase(update.fulfilled, (state, action) => {
        alert(action.payload.message);
      })
      .addCase(update.rejected, (state, action) => {
        alert(action.payload);
        console.log(action.payload);
      });
  },
});

export default customersSlice.reducer;
