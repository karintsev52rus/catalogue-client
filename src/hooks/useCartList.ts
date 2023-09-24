import { ISparePartInCart } from "../types/sparePart";

const useCartList = () => {
  const getQtyInCart = (partNumber: string, cartList: ISparePartInCart[]) => {
    const partIndex = cartList.findIndex(
      (part) => part.partNumber === partNumber
    );
    if (partIndex >= 0) {
      return cartList[partIndex].inCart;
    } else return 0;
  };

  return { getQtyInCart };
};

export { useCartList };
