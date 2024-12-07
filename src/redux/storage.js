import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const storage = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default storage;
