import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  navCollapsed: boolean;
};

const initialState: UiState = {
  navCollapsed: false,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNavCollapsed(state, action: PayloadAction<boolean>) {
      state.navCollapsed = action.payload;
    },
  },
});

export const uiActions = slice.actions;
export default slice.reducer;
