import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ILoaderState {
  show: boolean;
}

export interface IModalAction {
  type: string;
  payload: {
    show: boolean;
  };
}

const loaderState: ILoaderState = {
  show: false,
};

const loaderSlice = createSlice({
  name: "loaderSlice",
  initialState: loaderState,
  reducers: {
    setLoader(state: ILoaderState, action: IModalAction) {
      state.show = action.payload.show;
    },
  },
});

const loaderActions = loaderSlice.actions;
export { loaderActions };
export default loaderSlice.reducer;
