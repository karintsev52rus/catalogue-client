import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IModalState {
  show: boolean;
  modalTitle: string;
  modalMessage: string;
}

export interface IModalAction {
  type: string;
  payload: {
    show?: boolean;
    modalMessage: string;
    modalTitle: string;
  };
}

const modalState: IModalState = {
  show: false,
  modalTitle: "",
  modalMessage: "",
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
      }>
    ) {
      state.modalMessage = action.payload.modalMessage;
      state.modalTitle = action.payload.modalTitle;
    },
    setModalShow(state: IModalState, action: PayloadAction<{ show: boolean }>) {
      state.show = action.payload.show;
    },
    resetModalInfo(state: IModalState) {
      state.modalMessage = "";
      state.modalTitle = "";
      state.show = false;
    },
  },
});

const modalActions = modalSlice.actions;
export { modalActions };
export default modalSlice.reducer;
