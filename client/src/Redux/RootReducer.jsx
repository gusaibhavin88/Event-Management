import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./Auth/AuthSlice";
import userSliceReducer from "./User/UserSlice";
import eventSliceReducer from "./Event/EventSlice";

const combinedReducer = combineReducers({
  auth: authSliceReducer,
  user: userSliceReducer,
  event: eventSliceReducer,
});

export const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};
