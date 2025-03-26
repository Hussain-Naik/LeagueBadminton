import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { LeagueType } from "../typescript/Types";

type LeagueSliceType = {
  league: LeagueType;
  loaded: boolean
};

// Define the initial state using that type
const initialState: LeagueSliceType = {
  league: { id: "default", name: "", count: 0 },
  loaded: false,
};

export const leagueSlice = createSlice({
  name: "league",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLeague: (state, action: PayloadAction<LeagueType>) => {
      state.league = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export const { setLeague, setLoaded } = leagueSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLeague = (state: RootState) => state.league.league;

export default leagueSlice.reducer;
