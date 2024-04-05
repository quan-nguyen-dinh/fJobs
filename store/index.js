import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './couterSlice';
import i18n from './i18n';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    transalation: i18n
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
