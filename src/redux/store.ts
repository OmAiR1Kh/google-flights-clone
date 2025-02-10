import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import flightReducer from "./features/flights";
import airportReducer from "./features/airports";

export const store = configureStore({
  reducer: {
    flight: flightReducer,
    airports: airportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;
export type Callback = (success: boolean) => void;
