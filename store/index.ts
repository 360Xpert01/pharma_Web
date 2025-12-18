"use client";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./slices/auth-slice";
import uiReducer from "./slices/ui-slice";
import loginSlice from "./slices/auth/loginSlice";
import verifyOtp from "./slices/auth/verifyOtp";
import addRole from "./slices/role/addRole";
import allPreFixTable from "./slices/preFix/allPreFixTable";
import preFixReducer from "./slices/preFix/postPrefix";
import allPrefixesReducer from "./slices/preFix/getAllPrefixesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  login: loginSlice,
  verifyOtp: verifyOtp,
  addRole: addRole,
  allPreFixTable: allPreFixTable,
  preFixReducer: preFixReducer,
  allPrefixes: allPrefixesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "ui"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
