import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { createUser, setUser, checkAuth } from "../thunks/userThunk";

export interface IUserState extends User {
  auth: boolean;
  response: {
    status: "pending" | "fulfilled" | "rejected" | null;
    message: string;
  };
  loading: boolean;
}

export interface IUserAction {
  type: string;
  payload: { message: string } | User;
}

const userState: IUserState = {
  auth: false,
  user: null,
  response: {
    status: null,
    message: "",
  },
  loading: false,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState: userState,
  reducers: {
    resetStatus: (state) => {
      state.response.status = null;
      state.response.message = "";
    },
    logout: (state) => {
      state.auth = false;
      state.user = null;
      state.response.status = null;
      state.response.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUser.pending, (state) => {
        state.response.status = "pending";
      })
      .addCase(
        setUser.fulfilled,
        (state, action: { type: string; payload: User }) => {
          state.response.status = "fulfilled";
          state.user = action.payload.user;
          state.auth = true;
        }
      )
      .addCase(setUser.rejected, (state, action: PayloadAction<string>) => {
        state.response.status = "rejected";
        state.response.message = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.response.status = "pending";
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.response.status = "fulfilled";
          state.response.message = action.payload.message;
        }
      )
      .addCase(createUser.rejected, (state, action: PayloadAction<string>) => {
        state.response.status = "rejected";
        state.response.message = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action: PayloadAction<string>) => {
        state.response.message = action.payload;
        state.auth = false;
        state.user = null;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.response.status = "fulfilled";
          state.response.message = action.payload.message;
        }
      );
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
