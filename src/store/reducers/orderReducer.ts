import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../types/sparePart";
import { sendNewOrder } from "../thunks/orderThunk";
import { IError, ErrorTypes } from "../../types/error";

interface IOrderReducer extends IOrder {
  errors: {
    notAllReqFieldsFilled: IError;
  };
  send: {
    sended: boolean;
    error: boolean;
    responseMessage: string;
    loading: boolean;
  };
}

const orderState: IOrderReducer = {
  orderList: [],
  errors: {
    notAllReqFieldsFilled: {
      errorType: ErrorTypes.notAllReqFieldsFilled,
      error: false,
      errorMessage: "Заполните все обязательные поля",
      errorTitle: "Ошибка",
    },
  },
  custData: {
    custName: { value: "", label: "Имя" },
    custEmail: { value: "", label: "Email" },
    custPhone: { value: "", label: "Телефон" },
  },
  orderData: {
    orderDate: { value: "", label: "Дата" },
    orderTime: { value: "", label: "Время" },
    orderNumber: { value: "", label: "Номер заказа" },
  },
  send: {
    sended: false,
    error: false,
    responseMessage: "",
    loading: false,
  },
};

interface IOrderAction {
  type: string;
  payload: {
    orderProps: IOrder;
  };
}

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: orderState,
  reducers: {
    createOrder(state: IOrderReducer, action: IOrderAction) {
      const { orderProps } = action.payload;
      const { custData, orderData, orderList } = orderProps;
      state.custData = custData;
      state.orderData = orderData;
      state.orderList = orderList;
    },
    resetOrder(state: IOrderReducer) {
      (state.send.sended = false),
        (state.send.error = false),
        (state.send.responseMessage = "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendNewOrder.pending, (state) => {
      state.send.loading = true;
      state.send.sended = false;
      state.send.error = false;
    });
    builder.addCase(
      sendNewOrder.fulfilled,
      (state, action: PayloadAction<{ message: string; error?: boolean }>) => {
        state.send.loading = false;
        state.send.sended = true;
        state.send.responseMessage = action.payload.message;
        if (action.payload.error) {
          state.send.error = true;
        }
      }
    );
    builder.addCase(sendNewOrder.rejected, (state) => {
      state.send.error = true;
      state.send.responseMessage = "404";
      state.send.loading = false;
    });
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
