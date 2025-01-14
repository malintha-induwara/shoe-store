import AuthSlice from '../reducers/AuthSlice'
import customerSlice from '../reducers/CustomerSlice'
import itemSlice from '../reducers/ItemSlice'
import userSlice from '../reducers/UserSlice'
import staffSlice from '../reducers/StaffSlice'
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    customer: customerSlice,
    item: itemSlice,
    user: userSlice,
    staff: staffSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;