import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { shazamCoreAPI } from "features/shazam-core/shazamCoreAPI";
import darkThemeReducer from "features/dark-theme/darkThemeSlice";
import playerReducer from "features/player/playerSlice";
import { geoLocationAPI } from "features/geolocation/geoLocationAPI";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    darkTheme: darkThemeReducer,
    [shazamCoreAPI.reducerPath]: shazamCoreAPI.reducer,
    [geoLocationAPI.reducerPath]: geoLocationAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      shazamCoreAPI.middleware,
      geoLocationAPI.middleware
    ),
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
