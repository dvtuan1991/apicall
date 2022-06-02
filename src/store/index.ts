import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./PostSlice";
import userSlice from "./UserSlice";
export const store = configureStore({
  reducer: {
    users: userSlice,
    posts: postSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;