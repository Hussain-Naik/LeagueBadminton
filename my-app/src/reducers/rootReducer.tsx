import { combineReducers } from "redux";
import sessionReducer from "./sessionSlice"
import leagueReducer from "./leagueSlice"
import leaderboardReducer from "./leaderboardSlice"
import loadedReducer from "./fixtureSlice"
import gameReducer from "./gamesSlice"
import sidebarReducer from "./sidebarVisible"


const rootReducer = combineReducers({
    session: sessionReducer,
    league: leagueReducer,
    leaderboard: leaderboardReducer,
    loaded: loadedReducer,
    games: gameReducer,
    sidebar: sidebarReducer
});

export default rootReducer;