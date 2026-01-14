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
import createPrefixReducer from "./slices/preFix/postPrefix";
import allPrefixesReducer from "./slices/preFix/getAllPrefixesSlice";
import generatePrefixReducer from "./slices/preFix/generatePrefixSlice";
import registerEmployeeReducer from "./slices/employee/registerEmployee";
import updateEmployeeReducer from "./slices/employee/updateEmployeeSlice";
import getUserByIdReducer from "./slices/employee/getUserByIdSlice";
import allUsersReducer from "./slices/employee/getAllUsersSlice";
import usersByRoleReducer from "./slices/employee/getUsersByRoleSlice";
import userHierarchyReducer from "./slices/employee/getUserHierarchySlice";
import allChannelsReducer from "./slices/channel/getAllChannelsSlice";
import createChannelReducer from "./slices/channel/createChannelSlice";
import allCallPointsReducer from "./slices/callPoint/getAllCallPointsSlice";
import createCallPointReducer from "./slices/callPoint/createCallPointSlice";
import allGiveawaysReducer from "./slices/giveaway/getAllGiveawaysSlice";
import createGiveawayReducer from "./slices/giveaway/createGiveawaySlice";
import allProductsReducer from "./slices/product/getAllProductsSlice";
import productCategoriesReducer from "./slices/product/getProductCategoriesSlice";
import createProductReducer from "./slices/product/createProductSlice";
import allTeamsReducer from "./slices/team/getAllTeamsSlice";
import createTeamReducer from "./slices/team/createTeamSlice";
import brickListReducer from "./slices/brick/getBrickListSlice";
import allProductCategoriesReducer from "./slices/productCategory/getAllProductCategoriesSlice";
import createProductCategoryReducer from "./slices/productCategory/createProductCategorySlice";
import allSpecializationsReducer from "./slices/specialization/getAllSpecializationsSlice";
import createSpecializationReducer from "./slices/specialization/createSpecializationSlice";
import scheduleSliceReducer from "./slices/plan-Manage/scheduleSlice";
import singleScheduleDetailReducer from "./slices/plan-Manage/singleScheduleDetailSlice";
import scheduleHandleReducer from "./slices/plan-Manage/scheduleHandleSlice";
import singleScheduleByFilterReducer from "./slices/plan-Manage/sinleScheduleByFilter";
import callReportsReducer from "./slices/DCR/scheduleSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  login: loginSlice,
  verifyOtp: verifyOtp,
  addRole: addRole,
  allRoles: allRolesReducer,
  allPreFixTable: allPreFixTable,
  createPrefix: createPrefixReducer,
  allPrefixes: allPrefixesReducer,
  generatePrefix: generatePrefixReducer,
  registerEmployee: registerEmployeeReducer,
  updateEmployee: updateEmployeeReducer,
  getUserById: getUserByIdReducer,
  allUsers: allUsersReducer,
  usersByRole: usersByRoleReducer,
  userHierarchy: userHierarchyReducer,
  allChannels: allChannelsReducer,
  createChannel: createChannelReducer,
  allCallPoints: allCallPointsReducer,
  createCallPoint: createCallPointReducer,
  allGiveaways: allGiveawaysReducer,
  createGiveaway: createGiveawayReducer,
  allProducts: allProductsReducer,
  productCategories: productCategoriesReducer,
  createProduct: createProductReducer,
  allTeams: allTeamsReducer,
  createTeam: createTeamReducer,
  brickList: brickListReducer,
  allProductCategories: allProductCategoriesReducer,
  createProductCategory: createProductCategoryReducer,
  allSpecializations: allSpecializationsReducer,
  createSpecialization: createSpecializationReducer,
  schedule: scheduleSliceReducer,
  singleScheduleDetail: singleScheduleDetailReducer,
  scheduleHandle: scheduleHandleReducer,
  scheduleByFilter: singleScheduleByFilterReducer,
  callReports: callReportsReducer,
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
