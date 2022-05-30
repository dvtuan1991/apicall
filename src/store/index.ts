import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
export const store = configureStore({
  reducer: {
    users: userSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;