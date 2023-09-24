interface ISparePart {
  title: string;
  partNumber: string;
  price: number;
  brand?: string;
  rootGroup: string;
  quantity: number;
  parentGroup: string;
}

interface ISparePartInCart extends ISparePart {
  inCart: number;
}

interface IPartGroup {
  name: string;
  checked: boolean;
  index: number;
}

interface IOrder {
  custData: {
    custName: { value: string; label: string };
    custEmail: { value: string; label: string };
    custPhone: { value: string; label: string };
  };
  orderData: {
    orderDate: { value: string; label: string };
    orderTime: { value: string; label: string };
    orderNumber: { value: string; label: string };
  };
  orderList: ISparePartInCart[];
}

export { ISparePart, IPartGroup, ISparePartInCart, IOrder };
