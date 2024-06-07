import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './couterSlice';
import i18n from './i18n';
import callReducer from './call';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    transalation: i18n,
    call: callReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
