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

const partListLoading = (state: RootState) => {
  return state.partList.loading;
};

const loaderSelector = (state: RootState) => {
  return state.loader;
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
  return state.order.currentOrder;
};

const sendOrderSelector = (state: RootState) => {
  return state.order.currentOrder.send;
};

const ordersSelector = (state: RootState) => {
  return state.order.createdOrders;
};

const userSelector = (state: RootState) => {
  return state.user;
};

const isAuthSelector = (state: RootState) => {
  return state.user.auth;
};

export const partListSelectors = {
  loadedListSelector,
  renderListSelector,
  partListLoading,
  selectedListSelector,
  parentGroupsSelector,
  searchStringSelector,
};

export { loaderSelector };
export { cartListSelector, cartListErrorSelector };
export { modalSelector };
export { orderSelector, sendOrderSelector, ordersSelector };
export { userSelector, isAuthSelector };
