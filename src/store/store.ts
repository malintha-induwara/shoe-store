import AuthSlice from '../reducers/AuthSlice'
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;