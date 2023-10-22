import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreatedOrder, IOrder, ISparePartInCart } from "../../types/sparePart";
import { getUserOrders, sendNewOrder } from "../thunks/orderThunk";

interface IOrderReducer {
  currentOrder: {
    send: {
      status: "pending" | "fulfilled" | "rejected" | null;
      message: string;
      loading: boolean;
    };
    custData: {
      custName: string;
      custEmail: string;
      custPhone: string;
    };
    orderList: ISparePartInCart[];
  };
  createdOrders: {
    orders: CreatedOrder[];
    status: "pending" | "fulfilled" | "rejected" | null;
    message: string;
    loading: boolean;
  };
}

const orderState: IOrderReducer = {
  currentOrder: {
    orderList: [],
    custData: {
      custName: "",
      custEmail: "",
      custPhone: "",
    },
    send: {
      status: null,
      message: "",
      loading: false,
    },
  },
  createdOrders: {
    orders: [],
    status: null,
    message: "",
    loading: false,
  },
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: orderState,
  reducers: {
    resetOrder(state: IOrderReducer) {
      (state.currentOrder.send.status = null),
        (state.currentOrder.send.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendNewOrder.pending, (state) => {
        state.currentOrder.send.loading = true;
        state.currentOrder.send.status = "pending";
      })
      .addCase(
        sendNewOrder.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.currentOrder.send.loading = false;
          state.currentOrder.send.status = "fulfilled";
          state.currentOrder.send.message = action.payload.message;
        }
      )
      .addCase(
        sendNewOrder.rejected,
        (state, action: PayloadAction<string>) => {
          state.currentOrder.send.loading = false;
          state.currentOrder.send.status = "rejected";
          state.currentOrder.send.message = action.payload;
        }
      )
      .addCase(getUserOrders.pending, (state) => {
        state.createdOrders.status = "pending";
        state.createdOrders.loading = true;
      })
      .addCase(
        getUserOrders.fulfilled,
        (state, action: PayloadAction<CreatedOrder[]>) => {
          state.createdOrders.loading = false;
          state.createdOrders.status = "fulfilled";
          state.createdOrders.orders = action.payload;
        }
      )
      .addCase(
        getUserOrders.rejected,
        (state, action: PayloadAction<string>) => {
          state.createdOrders.status = "rejected";
          state.createdOrders.message = action.payload;
        }
      );
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
