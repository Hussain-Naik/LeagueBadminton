import { combineReducers } from "redux";
import sessionReducer from "./sessionSlice"
import leagueReducer from "./leagueSlice"
import leaderboardReducer from "./leaderboardSlice"
import loadedReducer from "./fixtureSlice"


const rootReducer = combineReducers({
    session: sessionReducer,
    league: leagueReducer,
    leaderboard: leaderboardReducer,
    loaded: loadedReducer
});

export default rootReducer;