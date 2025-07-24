import { configureStore } from '@reduxjs/toolkit';
import rsvpReducer from './slices/rsvpSlice';
import registryReducer from './slices/registrySlice'; 


export const store = configureStore({
  reducer: {
    rsvp: rsvpReducer,
    registry: registryReducer,
  },
});