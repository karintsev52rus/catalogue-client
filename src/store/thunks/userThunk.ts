import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { IUserState } from "../reducers/userReducer";

const server = process.env.SERVER;
const staticPath = process.env.STATIC_PATH;

interface IAuthData {
  email: string;
  password: string;
}

interface IRegData {
  email: string;
  name: string;
  password: string;
  phone: string;
}

export const setUser = createAsyncThunk<
  User,
  IAuthData,
  { rejectValue: string }
>("user/setUser", async (authData, { rejectWithValue }) => {
  const strBody = JSON.stringify(authData);
  const response = await fetch(`${server}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: strBody,
  });
  if (response.ok) {
    const data = (await response.json()) as User;
    const token = data.user.token;
    localStorage.setItem("token", token);
    return data;
  } else {
    const error = await response.json();
    return rejectWithValue(error.message);
  }
});

export const createUser = createAsyncThunk<
  { message: string },
  IRegData,
  { rejectValue: string }
>("user/CreateUser", async (regData, { rejectWithValue }) => {
  try {
    const strBody = JSON.stringify(regData);
    const response = await fetch(`${server}/api/auth/registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: strBody,
    });
    if (response.ok) {
      return (await response.json()) as { message: string };
    } else {
      const error = await response.json();

      throw new Error(error.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const checkAuth = createAsyncThunk<
  { message: string },
  undefined,
  { rejectValue: string }
>("user/CheckAuth", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${server}/api/auth/auth`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      localStorage.removeItem("token");
      const data = await response.json();
      const message = data.message as string;
      throw new Error(message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
