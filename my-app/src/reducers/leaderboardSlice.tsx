import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { LeaderboardType } from "../typescript/Types";

type LeaderboardSliceType = {
  object: LeaderboardType;
};

// Define the initial state using that type
const initialState: LeaderboardSliceType = {
  object: {},
};

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLeaderboard: (state, action: PayloadAction<LeaderboardType>) => {
      state.object = action.payload;
    },
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLeaderboard = (state: RootState) => state.leaderboard.object;

export default leaderboardSlice.reducer;
