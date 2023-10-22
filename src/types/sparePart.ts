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
    custName: string;
    custEmail: string;
    custPhone: string;
  };
  orderList: ISparePartInCart[];
}

interface CreatedOrder extends IOrder {
  orderData: {
    orderNumber: { value: string; label: string };
    orderDate: { value: string; label: string };
    orderTime: { value: string; label: string };
  };
  userId: string;
}

type OrderList = CreatedOrder[];

export {
  ISparePart,
  IPartGroup,
  ISparePartInCart,
  IOrder,
  CreatedOrder,
  OrderList,
};
