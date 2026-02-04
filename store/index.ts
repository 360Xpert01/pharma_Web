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
import getGiveawayByIdReducer from "./slices/giveaway/getGiveawayByIdSlice";
import updateGiveawayReducer from "./slices/giveaway/updateGiveawaySlice";
import allProductsReducer from "./slices/product/getAllProductsSlice";
import productCategoriesReducer from "./slices/product/getProductCategoriesSlice";
import createProductReducer from "./slices/product/createProductSlice";
import updateProductReducer from "./slices/product/updateProductSlice";
import productByIdReducer from "./slices/product/getProductByIdSlice";
import allTeamsReducer from "./slices/team/getAllTeamsSlice";
import createTeamReducer from "./slices/team/createTeamSlice";
import updateTeamReducer from "./slices/team/updateTeamSlice";
import getTeamByIdReducer from "./slices/team/getTeamByIdSlice";
import brickListReducer from "./slices/brick/getBrickListSlice";
import brickByIdReducer from "./slices/brick/getBrickByIdSlice";
import allProductCategoriesReducer from "./slices/productCategory/getAllProductCategoriesSlice";
import createProductCategoryReducer from "./slices/productCategory/createProductCategorySlice";
import allSpecializationsReducer from "./slices/specialization/getAllSpecializationsSlice";
import createSpecializationReducer from "./slices/specialization/createSpecializationSlice";
import updateDoctorSpecializationReducer from "./slices/specialization/updateDoctorSpecializationSlice";
import getDoctorSpecializationByIdReducer from "./slices/specialization/getDoctorSpecializationByIdSlice";
import scheduleSliceReducer from "./slices/plan-Manage/scheduleSlice";
import singleScheduleDetailReducer from "./slices/plan-Manage/singleScheduleDetailSlice";
import scheduleHandleReducer from "./slices/plan-Manage/scheduleHandleSlice";
import singleScheduleByFilterReducer from "./slices/plan-Manage/sinleScheduleByFilter";
import callReportsReducer from "./slices/DCR/scheduleSlice";
import weeklyCallsSlice from "./slices/employeeProfile/weeklyCallsSlice";
import weekelyCallExpenses from "./slices/employeeProfile/weeklyCallExpensesSlice";
import uploadReducer from "./slices/upload/uploadSlice";
import allQualificationsReducer from "./slices/qualification/getAllQualificationsSlice";
import createQualificationReducer from "./slices/qualification/createQualificationSlice";
import updateQualificationReducer from "./slices/qualification/updateQualificationSlice";
import getQualificationByIdReducer from "./slices/qualification/getQualificationByIdSlice";
import allSegmentsReducer from "./slices/segment/getAllSegmentsSlice";
import createSegmentReducer from "./slices/segment/createSegmentSlice";
import getSegmentByIdReducer from "./slices/segment/getSegmentByIdSlice";
import updateSegmentReducer from "./slices/segment/updateSegmentSlice";
import partiesReducer from "./slices/party/partiesSlice";
import createPartyReducer from "./slices/party/partySlicePost";
import partyByIdReducer from "./slices/party/partygetId";
import partySampleReducer from "./slices/party/partySampleSlice";
import partyGiveawayReducer from "./slices/party/partyGiveawaySlice";
import updatePartyReducer from "./slices/party/updatePartySlice";
import organizationPartiesReducer from "./slices/party/organizationPartiesSlice";
import partyPlanReducer from "./slices/party/partyPlanSlice";
import pendingRequestsReducer from "./slices/PendingRequest/pendingRequestsSlice";
import handleOtpSliceReducer from "./slices/PendingRequest/handleOtpRequestsSlice";

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
  getGiveawayById: getGiveawayByIdReducer,
  updateGiveaway: updateGiveawayReducer,
  allProducts: allProductsReducer,
  productCategories: productCategoriesReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  productById: productByIdReducer,
  allTeams: allTeamsReducer,
  createTeam: createTeamReducer,
  brickList: brickListReducer,
  brickById: brickByIdReducer,
  allProductCategories: allProductCategoriesReducer,
  createProductCategory: createProductCategoryReducer,
  allSpecializations: allSpecializationsReducer,
  createSpecialization: createSpecializationReducer,
  updateDoctorSpecialization: updateDoctorSpecializationReducer,
  specializationById: getDoctorSpecializationByIdReducer,
  schedule: scheduleSliceReducer,
  singleScheduleDetail: singleScheduleDetailReducer,
  scheduleHandle: scheduleHandleReducer,
  scheduleByFilter: singleScheduleByFilterReducer,
  callReports: callReportsReducer,
  weeklyCalls: weeklyCallsSlice,
  weekelyCallExpenses: weekelyCallExpenses,
  upload: uploadReducer,
  allQualifications: allQualificationsReducer,
  createQualification: createQualificationReducer,
  updateQualification: updateQualificationReducer,
  qualificationById: getQualificationByIdReducer,
  allSegments: allSegmentsReducer,
  createSegment: createSegmentReducer,
  segmentById: getSegmentByIdReducer,
  updateSegment: updateSegmentReducer,
  parties: partiesReducer,
  createParty: createPartyReducer,
  partyById: partyByIdReducer,
  partySample: partySampleReducer,
  partyGiveaway: partyGiveawayReducer,
  updateParty: updatePartyReducer,
  organizationParties: organizationPartiesReducer,
  partyPlan: partyPlanReducer,
  getTeamById: getTeamByIdReducer,
  updateTeam: updateTeamReducer,
  pendingRequests: pendingRequestsReducer,
  handleOtp: handleOtpSliceReducer,
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
