import { combineReducers } from "redux";
import errors from "./errorReducers";
import project from "./projectReducer";
import backlog from "./backlogReducer";
import security from "./securityReducer";

export default combineReducers({
  errors,
  project,
  backlog,
  security,
});
