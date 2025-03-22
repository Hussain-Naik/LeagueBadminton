import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { SessionsType } from "../typescript/Types";

type SessionsSliceType = {
  object: SessionsType;
};

// Define the initial state using that type
const initialState: SessionsSliceType = {
  object: {
    id: "",
    league: "",
    count: 0,
    date: "",
    game_type: "",
    player_count: 0,
    player_type: "",
    progress: 0,
  },
};

export const sessionSlice = createSlice({
  name: "session",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSession: (state, action: PayloadAction<SessionsType>) => {
      state.object = action.payload
    },
  },
});

export const { setSession } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSession = (state: RootState) => state.session.object;

export default sessionSlice.reducer;
