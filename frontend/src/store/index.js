import { configureStore } from "@reduxjs/toolkit";
import AuthReduce from "./auth";

const store = configureStore({
  reducer: {
    auth: AuthReduce,
  },
});

export default store;
