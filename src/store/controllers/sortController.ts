import { ISparePart } from "../../types/sparePart";
import { IState } from "../reducers/partListReducer";

const titleSort = (a: ISparePart, b: ISparePart) => {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  if (a.title === b.title) {
    return 0;
  }
};

const titleSorter = (partList: ISparePart[]) => {
  return partList.sort(titleSort);
};

const stockSorter = (partList: ISparePart[]) => {
  let notInStock: ISparePart[] = [];
  let inStock: ISparePart[] = [];
  partList.forEach((part) => {
    if (part.quantity === 0) {
      notInStock.push(part);
    } else {
      inStock.push(part);
    }
  });
  const result = [...inStock, ...notInStock];
  return result;
};

export { titleSorter, stockSorter };
