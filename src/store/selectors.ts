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

const parentGroupsSelector = (state: RootState) => {
  return state.partList.parentGroups;
};

const searchStringSelector = (state: RootState) => {
  return state.partList.searchString;
};

export const partListSelectors = {
  loadedListSelector,
  renderListSelector,
  selectedListSelector,
  loaderSelector,
  parentGroupsSelector,
  searchStringSelector,
};
