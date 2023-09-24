import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ISparePartInCart,
  IPartGroup,
  ISparePart,
} from "../../types/sparePart";
import {
  addPartToCart,
  deletePartFromCart,
  setPartQty,
} from "../controllers/cartController";
import { IError, ErrorTypes } from "../../types/error";

export interface ICartState {
  errors: {
    qtyInCartMoreThanStock: IError;
  };
  cartList: ISparePartInCart[];
}

export interface ICartAction {
  type: string;
  payload: {
    cartList: ISparePartInCart[];
    partNumber: string;
    quantity: number;
  };
}

const cartState: ICartState = {
  errors: {
    qtyInCartMoreThanStock: {
      error: false,
      errorMessage: "Количество товара в корзине больше, чем в наличии",
      errorType: ErrorTypes.qtyInCartMoreThanStock,
      errorTitle: "Ошибка",
    },
  },
  cartList: [],
};

const cartSlice = createSlice({
  name: "cartReducer",
  initialState: cartState,
  reducers: {
    setCartList(
      state: ICartState,
      action: PayloadAction<{ cartList: ISparePartInCart[] }>
    ) {
      state.cartList = action.payload.cartList;
    },
    addPart(
      state: ICartState,
      action: PayloadAction<{ partInfo: ISparePart; quantity: number }>
    ) {
      addPartToCart(state, action.payload.partInfo, action.payload.quantity);
    },
    setQuty(
      state: ICartState,
      action: PayloadAction<{ partInfo: ISparePart; quantity: number }>
    ) {
      setPartQty(state, action.payload.partInfo, action.payload.quantity);
    },
    deletePart(
      state: ICartState,
      action: PayloadAction<{ partInfo: ISparePart }>
    ) {
      deletePartFromCart(state, action.payload.partInfo);
    },
    setCartQtyError(
      state: ICartState,
      action: PayloadAction<{ errorType: ErrorTypes; error: boolean }>
    ) {
      state.errors[ErrorTypes.qtyInCartMoreThanStock].error =
        action.payload.error;
    },
  },
});

const cartActions = cartSlice.actions;

export { cartActions };
export default cartSlice.reducer;
