import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArtistSong, Song } from "common/interfaces";

const initialState: {
  currentSongs: Array<Song> | Array<ArtistSong>;
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong?: Song | ArtistSong;
} = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: undefined,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (
      state,
      action: PayloadAction<{
        song: Song | ArtistSong;
        i: number;
        data: Array<Song>;
      }>
    ) => {
      const { song, data, i } = action.payload;
      state.activeSong = song;
      state.currentSongs = data;
      state.currentIndex = i;
      state.isActive = true;
    },

    nextSong: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.activeSong = state.currentSongs[index];
      state.currentIndex = index;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      const index = action.payload;
      state.activeSong = state.currentSongs[index];
      state.currentIndex = index;
      state.isActive = true;
    },

    playPause: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause } =
  playerSlice.actions;

export default playerSlice.reducer;
