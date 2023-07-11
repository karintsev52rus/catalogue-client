import { IState } from "../reducers/partListReducer";
import { ISparePart } from "../../types/sparePart";

const searchStringFilterFunction = (partList: ISparePart[], state: IState) => {
  if (!state.searchString.active) {
    return partList;
  }
  if (state.searchString.value.length === 0) {
    return partList;
  }
  const copyPartList = partList.slice(0, partList.length);

  const searchStringArray = state.searchString.value.split(" ");
  if (searchStringArray.length > 1) {
    console.log(searchStringArray);
    const result = copyPartList.filter((item) => {
      let includes = true;
      searchStringArray.forEach((string) => {
        if (item.title.toLowerCase().indexOf(string.toLowerCase()) < 0) {
          includes = false;
        }
      });
      return includes === true;
    });
    return result;
  }

  const filteredData = copyPartList.filter((item) => {
    return (
      item.title
        .toLowerCase()
        .indexOf(state.searchString.value.toLowerCase()) >= 0
    );
  });
  return filteredData;
};

export { searchStringFilterFunction };
