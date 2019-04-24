import { combineReducers } from "redux";
import messages from "./messages";
import users from "./users";
import friends from "./friends";

export default combineReducers({
  messages,
  users,
  friends
});
