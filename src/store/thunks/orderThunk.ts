import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreatedOrder, IOrder } from "../../types/sparePart";

const server = process.env.SERVER;

export const sendNewOrder = createAsyncThunk<
  { message: string },
  IOrder,
  { rejectValue: string }
>("order/sendOrder", async (orderData, { rejectWithValue }) => {
  try {
    const orderStr = JSON.stringify({ order: orderData });
    const response = await fetch(`${server}/api/orders/new_order`, {
      method: "POST",
      body: orderStr,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getUserOrders = createAsyncThunk<
  CreatedOrder[],
  undefined,
  { rejectValue: string }
>("order/getUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response: Response = await fetch(
      `${server}/api/orders/get_user_orders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      const orders = (await response.json()) as CreatedOrder[];
      return orders;
    } else {
      const json = await response.json();
      throw new Error(json.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
