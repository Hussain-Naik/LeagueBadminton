import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { LeagueType } from '../typescript/Types'


// Define the initial state using that type
const initialState: LeagueType = {
  id: "default",
  name: "",
  count: 0,
}

export const leagueSlice = createSlice({
  name: 'league',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLeague: (state, action: PayloadAction<LeagueType>) => {
      state.name = action.payload.name
      state.id = action.payload.id
      state.count = action.payload.count
    },
  },
})

export const { setLeague } = leagueSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLeague = (state: RootState) => state.league

export default leagueSlice.reducer