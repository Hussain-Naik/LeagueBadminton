import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";


// Define the initial state using that type
const initialState = {
  loaded: true,
};

export const fixtureSlice = createSlice({
  name: "loaded",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export const { setLoaded } = fixtureSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoaded = (state: RootState) => state.loaded.loaded;

export default fixtureSlice.reducer;
