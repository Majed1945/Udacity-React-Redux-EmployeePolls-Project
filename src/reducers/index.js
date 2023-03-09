import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import { configureStore } from "@reduxjs/toolkit";

export default combineReducers({
  authedUser,
  users,
  questions,
});
export const store1 = configureStore({
  reducer: {
    authedUser,
    users,
    questions,
  },
});
