import { combineReducers, configureStore } from "@reduxjs/toolkit";
import partListReducer from "./reducers/partListReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducers/cartReducer";
import modalReducer from "./reducers/modalReducer";
import orderReducer from "./reducers/orderReducer";
import loaderReducer from "./reducers/loaderReducer";
import userReducer from "./reducers/userReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["partList", "modal", "loader", "order"],
};

const rootReducer = combineReducers({
  user: userReducer,
  partList: partListReducer,
  cart: cartReducer,
  modal: modalReducer,
  order: orderReducer,
  loader: loaderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
