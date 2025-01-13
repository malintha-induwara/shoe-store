import AuthSlice from '../reducers/AuthSlice'
import customerSlice from '../reducers/CustomerSlice'
import itemSlice from '../reducers/ItemSlice'
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    customer: customerSlice,
    item: itemSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;