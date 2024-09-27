import { combineReducers } from "@reduxjs/toolkit";
// API
import { api } from "@/features/api";
// Slice reducers
import { appSlice } from "@/features/app/appSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appSlice.reducer,
});

export default rootReducer;
