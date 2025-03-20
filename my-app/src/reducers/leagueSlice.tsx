import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'

// Define a type for the slice state
interface LeagueState {
  value: string
}

// Define the initial state using that type
const initialState: LeagueState = {
  value: "default",
}

export const leagueSlice = createSlice({
  name: 'league',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLeague: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setLeague } = leagueSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLeague = (state: RootState) => state.league.value

export default leagueSlice.reducer