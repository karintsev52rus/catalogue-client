import { ISparePart, ISparePartInCart } from "../../types/sparePart";
import { ICartState } from "../reducers/cartReducer";

const addPartToCart = (
  state: ICartState,
  partInfo: ISparePart,
  addedQty: number
) => {
  const { cartList } = state;
  if (cartList.length > 0) {
    const partIndex = cartList.findIndex(
      (part) => part.partNumber === partInfo.partNumber
    );
    if (partIndex < 0) {
      state.cartList.push({ ...partInfo, inCart: addedQty });
    } else {
      const qtyInCart = cartList[partIndex].inCart;
      const newPartInfo = { ...partInfo, inCart: qtyInCart + addedQty };
      state.cartList.splice(partIndex, 1, newPartInfo);
    }
  } else {
    state.cartList.push({ ...partInfo, inCart: addedQty });
  }
};

const deletePartFromCart = (state: ICartState, partInfo: ISparePart) => {
  const partIndex = state.cartList.findIndex(
    (part) => part.partNumber === partInfo.partNumber
  );
  if (partIndex >= 0) {
    state.cartList.splice(partIndex, 1);
  }
};

const setPartQty = (
  state: ICartState,
  partInfo: ISparePart,
  qtyInCart: number
) => {
  const { cartList } = state;
  if (cartList.length > 0) {
    const partIndex = cartList.findIndex(
      (part) => part.partNumber === partInfo.partNumber
    );
    console.log(partInfo, qtyInCart);
    if (partIndex < 0) {
      state.cartList.push({ ...partInfo, inCart: qtyInCart });
    } else {
      const newPartInfo = { ...partInfo, inCart: qtyInCart };
      state.cartList.splice(partIndex, 1, newPartInfo);
    }
  } else {
    state.cartList.push({ ...partInfo, inCart: qtyInCart });
  }
};

export { addPartToCart, deletePartFromCart, setPartQty };
