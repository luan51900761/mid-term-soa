import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchLoginUser = createAsyncThunk(
  "user/fetchLoginUser",
  async ({ user, navigate = null }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/v1/api/auth/login",
        user,
        {
          withCredentials: true,
        }
      );

      if (navigate) {
        navigate("/");
      }
      return res.data;
    } catch (err) {
      console.log(err.response.data.msg);

      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const fetchLogoutUser = createAsyncThunk(
  "user/fetchLogoutUser",
  async ({ axiosJWT, token, navigate = null }, { rejectWithValue }) => {
    try {
      const res = await axiosJWT.post(
        "http://localhost:3000/v1/api/auth/logout",
        {
          token,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (navigate) {
        navigate("/login");
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      state.status = "success";
    },
  },
  extraReducers: {
    [fetchLoginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchLoginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.user = action.payload;
      state.error = null;
    },
    [fetchLoginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [fetchLogoutUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchLogoutUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.user = null;
      state.error = null;
    },
    [fetchLogoutUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
