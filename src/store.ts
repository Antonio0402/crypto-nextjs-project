import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./api/cryptoApi";
import { cryptoNewsApi } from "./api/cryptoNewsApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptoNewsApi.middleware),
  devTools: true,
})