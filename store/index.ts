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
import allRolesReducer from "./slices/role/getAllRolesSlice";
import allPreFixTable from "./slices/preFix/allPreFixTable";
import preFixReducer from "./slices/preFix/postPrefix";
import allPrefixesReducer from "./slices/preFix/getAllPrefixesSlice";
import generatePrefixReducer from "./slices/preFix/generatePrefixSlice";
import registerEmployeeReducer from "./slices/employee/registerEmployee";
import allUsersReducer from "./slices/employee/getAllUsersSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  login: loginSlice,
  verifyOtp: verifyOtp,
  addRole: addRole,
  allRoles: allRolesReducer,
  allPreFixTable: allPreFixTable,
  preFixReducer: preFixReducer,
  allPrefixes: allPrefixesReducer,
  generatePrefix: generatePrefixReducer,
  registerEmployee: registerEmployeeReducer,
  allUsers: allUsersReducer,
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
