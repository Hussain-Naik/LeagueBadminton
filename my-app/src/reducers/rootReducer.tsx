import { combineReducers } from "redux";
import sessionReducer from "./sessionSlice"
import leagueReducer from "./leagueSlice"


const rootReducer = combineReducers({
    session: sessionReducer,
    league: leagueReducer,
});

export default rootReducer;