import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux-store";

const initialState: { isDark?: boolean } = {
  isDark: undefined,
};

const darkThemeSlice = createSlice({
  name: "dark-theme",
  initialState,
  reducers: {
    setDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
  },
});

export default darkThemeSlice.reducer;

export const { setDarkTheme } = darkThemeSlice.actions;

export const selectIsDark = (state: RootState) => state.darkTheme.isDark;
