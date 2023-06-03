import { RootState } from ".";

const loadedListSelector = (state: RootState) => {
  return state.partList.loadedList;
};

const renderListSelector = (state: RootState) => {
  return state.partList.renderedList;
};

const selectedListSelector = (state: RootState) => {
  return state.partList.selectedList;
};

const loaderSelector = (state: RootState) => {
  return state.partList.loading;
};

export const partListSelectors = {
  loadedListSelector,
  renderListSelector,
  selectedListSelector,
  loaderSelector,
};
