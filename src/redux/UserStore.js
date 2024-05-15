import {configureStore} from '@reduxjs/toolkit';
import userReducer from './UserSlice';

const UserStore = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default UserStore;
