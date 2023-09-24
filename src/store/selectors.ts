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

const parentGroupsSelector = (state: RootState) => {
  return state.partList.parentGroups;
};

const searchStringSelector = (state: RootState) => {
  return state.partList.searchString;
};

const loaderSelector = (state: RootState) => {
  return state.partList.loading;
};

const cartListSelector = (state: RootState) => {
  return state.cart.cartList;
};

const cartListErrorSelector = (state: RootState) => {
  return state.cart.errors;
};

const modalSelector = (state: RootState) => {
  return state.modal;
};

const orderSelector = (state: RootState) => {
  return state.order;
};

const sendOrderSelector = (state: RootState) => {
  return state.order.send;
};

export const partListSelectors = {
  loadedListSelector,
  renderListSelector,
  selectedListSelector,
  loaderSelector,
  parentGroupsSelector,
  searchStringSelector,
};

export { cartListSelector, cartListErrorSelector };
export { modalSelector };
export { orderSelector };
export { sendOrderSelector };
