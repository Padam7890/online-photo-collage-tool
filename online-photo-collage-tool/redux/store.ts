import { configureStore } from "@reduxjs/toolkit";
import { collageMaker } from "./api/collage-maker";

export const store = configureStore({
  reducer: {
   [collageMaker.reducerPath]: collageMaker.reducer
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(collageMaker.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
