import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { SessionsType } from '../typescript/Types'


// Define the initial state using that type
const initialState: SessionsType = {
    id: "",
    league: "",
    count: 0,
    date: "",
    game_type: "",
    player_count: 0,
    player_type: "",
    progress: 0,
}

export const sessionSlice = createSlice({
  name: 'session',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSession: (state, action: PayloadAction<SessionsType>) => {
      state.id = action.payload.id
      state.league = action.payload.league
      state.count = action.payload.count
      state.date = action.payload.date
      state.game_type = action.payload.game_type
      state.player_count = action.payload.player_count
      state.player_type = action.payload.player_type
      state.progress = action.payload.progress
    },
  },
})

export const { setSession } = sessionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSession = (state: RootState) => state.session

export default sessionSlice.reducer