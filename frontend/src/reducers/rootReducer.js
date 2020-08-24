import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import playerReducer from "./playerReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    players: playerReducer,
  });

export default rootReducer;
