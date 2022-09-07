import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactsService from "./contactsService";
const initialState = {
  contacts: [],
  isError: false,
  message: "",
  isLoading: false,
  isSuccess: false,
};

// Fetch contacts

/* interface userDataI {
  data: {
    email: string;
    password: string;
    confirmPassword?: string;
  };
}
 */
export const getContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (accId: string, thunkAPI) => {
    try {
      console.log("FETCH CONTACTS SLICE TRIGGERED....");
      const test = await contactsService.fetchContacts(accId);
      console.log(test);
      return test;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
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
      .addCase(getContacts.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.contacts = null;
      });
  },
});

export const { reset } = contactsSlice.actions;
export default contactsSlice.reducer;
