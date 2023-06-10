interface ISparePart {
  title: string;
  partNumber: string;
  price: number;
  brand?: string;
  rootGroup: string;
  quantity: number;
  parentGroup: string;
}

interface IPartGroup {
  name: string;
  checked: boolean;
  index: number;
}

export { ISparePart, IPartGroup };
