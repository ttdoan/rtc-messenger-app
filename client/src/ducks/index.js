import { combineReducers } from "redux";
import user from "./user";
import site from "./site";

const rootReducer = combineReducers({
  user,
  site,
});

export default rootReducer;
