import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { MatchType } from "../typescript/Types";

type GameSliceType = {
  games: MatchType[][];
};

// Define the initial state using that type
const initialState: GameSliceType = {
  games: [],
};

export const gameSlice = createSlice({
  name: "games",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGames: (state, action: PayloadAction<MatchType[]>) => {
      state.games = [...state.games, action.payload];
    },
    resetGames: (state) => {
      state.games = []
    },
  },
});

export const { setGames, resetGames } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGame = (state: RootState) => state.games.games;

export default gameSlice.reducer;
