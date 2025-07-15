import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";


// Define the initial state using that type
const initialState = {
  visible: false,
};

export const sidebarVisible = createSlice({
  name: "visible",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = sidebarVisible.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectVisible = (state: RootState) => state.visible.visible;

export default sidebarVisible.reducer;
