import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import signupReducer from './signupSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
