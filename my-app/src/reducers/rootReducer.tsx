import { combineReducers } from "redux";
import sessionReducer from "./sessionSlice"
import leagueReducer from "./leagueSlice"
import LeaderboardReducer from "./leaderboardSlice"


const rootReducer = combineReducers({
    session: sessionReducer,
    league: leagueReducer,
    leaderboard: LeaderboardReducer,
});

export default rootReducer;