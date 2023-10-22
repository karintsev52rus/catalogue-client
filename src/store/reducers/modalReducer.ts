import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IModalState {
  show: boolean;
  modalTitle: string;
  modalMessage: string;
  redirectTo?: string;
}

export interface IModalAction {
  type: string;
  payload: {
    show?: boolean;
    modalMessage: string;
    modalTitle: string;
    redirectTo: string;
  };
}

const modalState: IModalState = {
  show: false,
  modalTitle: "",
  modalMessage: "",
  redirectTo: null,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: modalState,
  reducers: {
    setModalInfo(
      state: IModalState,
      action: PayloadAction<{
        modalTitle: string;
        modalMessage: string;
        redirectTo?: string;
      }>
    ) {
      state.modalMessage = action.payload.modalMessage;
      state.modalTitle = action.payload.modalTitle;
      state.redirectTo = action.payload.redirectTo;
    },
    setModalShow(state: IModalState, action: PayloadAction<{ show: boolean }>) {
      state.show = action.payload.show;
    },
    resetModalInfo(state: IModalState) {
      state.modalMessage = "";
      state.modalTitle = "";
      state.show = false;
      state.redirectTo = null;
    },
  },
});

const modalActions = modalSlice.actions;
export { modalActions };
export default modalSlice.reducer;
