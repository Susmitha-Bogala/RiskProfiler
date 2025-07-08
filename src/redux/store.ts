import { configureStore } from '@reduxjs/toolkit';
import riskReducer from './slices/riskSlice';

const store = configureStore({
  reducer: {
    risk: riskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
