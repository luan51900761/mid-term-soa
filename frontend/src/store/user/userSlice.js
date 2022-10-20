import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLoginUser = createAsyncThunk(
  "user/fetchLoginUser",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/v1/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // if res != 200 => throw error
      if (res.status === 400) {
        const error = await res.json();
        return rejectWithValue(error);
      }
      if (res.status === 404) {
        const error = await res.json();
        return rejectWithValue(error);
      }
      const data = await res.json();
      navigate("/");
      return data;
    } catch (err) {
      console.log(err);

      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isLogged: false,
  user: null,
  status: "idle",
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLoginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchLoginUser.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.user = action.payload;
      state.error = null;
    },
    [fetchLoginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.msg;
    },
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default userSlice.reducer;
