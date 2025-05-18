import { configureStore } from '@reduxjs/toolkit';
import rsvpReducer from './slices/rsvpSlice';

export const store = configureStore({
  reducer: {
    rsvp: rsvpReducer,
  },
});