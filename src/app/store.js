import { configureStore } from "@reduxjs/toolkit";
import tripSlice from "../features/trip/tripSlice";

export const store = configureStore({
  reducer: {
    trip: tripSlice,
  },
});
