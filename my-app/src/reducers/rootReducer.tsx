import { combineReducers } from "redux";
import sessionReducer from "./sessionSlice"
import leagueReducer from "./leagueSlice"
import leaderboardReducer from "./leaderboardSlice"
import loadedReducer from "./fixtureSlice"
import gameReducer from "./gamesSlice"


const rootReducer = combineReducers({
    session: sessionReducer,
    league: leagueReducer,
    leaderboard: leaderboardReducer,
    loaded: loadedReducer,
    games: gameReducer
});

export default rootReducer;