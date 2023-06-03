import { configureStore } from "@reduxjs/toolkit";
import { partListReducer } from "./reducers/partListReducer";

export const store = configureStore({
  reducer: {
    partList: partListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
