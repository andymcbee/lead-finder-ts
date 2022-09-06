import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

interface initialStateI {
  user: null | string;
  isError: boolean;
  message: null | string;
  isLoading: boolean;
  isSuccess: boolean;
}

//const token: string | null = JSON.parse(localStorage.getItem("token") || "{}");
//use this for when we create a re-fresh slice

const initialState: initialStateI = {
  user: null,
  isError: false,
  message: "",
  isLoading: false,
  isSuccess: false,
};

// Register user

interface userDataI {
  data: {
    email: string;
    password: string;
    confirmPassword?: string;
  };
}

export const register = createAsyncThunk(
  "auth/register",
  async (userData: userDataI, thunkAPI) => {
    try {
      console.log("AUTH SIGNUP SLICE TRIGGERED....");
      const test = await authService.register(userData);
      console.log(test);
      return test;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: userDataI, thunkAPI) => {
    try {
      console.log("AUTH LOGIN SLICE TRIGGERED....");
      const test = await authService.login(userData);
      console.log(test);
      return test;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.isError = false;
      state.message = "";
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state: any, action) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
