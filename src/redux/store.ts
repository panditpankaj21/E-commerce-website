import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // This allows you to use `state.cart` in `useSelector`
  },
});

// Define the `RootState` and `AppDispatch` types based on the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
