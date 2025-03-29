import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { FixtureType, SessionsType } from "../typescript/Types";

type SessionsSliceType = {
  session: SessionsType;
  loaded: boolean;
  fixtures: FixtureType[];
  date: string;
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
  loaded: false,
  fixtures: [],
  date: ""
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
    setFixtures: (state, action: PayloadAction<FixtureType[]>) => {
      state.fixtures = action.payload
    },
    setSessionDate: (state, action: PayloadAction<string>) => {
      state.session.date = action.payload
    },
    setSettingDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload
    },
    
  },
});

export const { setSession, setLoaded, setFixtures, setSessionDate, setSettingDate } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSession = (state: RootState) => state.session.session;

export default sessionSlice.reducer;
