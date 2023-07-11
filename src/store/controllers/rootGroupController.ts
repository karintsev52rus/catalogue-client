import { ISparePart } from "../../types/sparePart";
import { IState } from "../reducers/partListReducer";

const rootGroupFilterFunction = (partList: ISparePart[], state: IState) => {
  if (state.rootGroup.active) {
    const rootGroup = state.rootGroup;
    const result = partList.filter((part) => {
      return part.rootGroup === rootGroup.groupName;
    });
    return result;
  } else {
    return partList;
  }
};

export { rootGroupFilterFunction };
