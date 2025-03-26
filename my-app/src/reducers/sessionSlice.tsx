import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { SessionsType } from "../typescript/Types";

type SessionsSliceType = {
  session: SessionsType;
  loaded:boolean
};

// Define the initial state using that type
const initialState: SessionsSliceType = {
  session: {
    id: "",
    league: "",
    count: 0,
    date: "",
    game_type: "",
    player_count: 0,
    player_type: "",
    progress: 0,
  },
  loaded: false
};

export const sessionSlice = createSlice({
  name: "session",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSession: (state, action: PayloadAction<SessionsType>) => {
      state.session = action.payload
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload
    },
  },
});

export const { setSession, setLoaded } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSession = (state: RootState) => state.session.session;

export default sessionSlice.reducer;
