import { combineReducers } from "redux";
import counterReducer from "./counterSlice"
import leagueReducer from "./leagueSlice"


const rootReducer = combineReducers({
    counter: counterReducer,
    league: leagueReducer,
});

export default rootReducer;