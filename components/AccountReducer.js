// userStore.js
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

export const setUserInfo = createAction('user/set');

const userInfoReducer = createReducer(null, (builder) => {
  builder.addCase(setUserInfo, (state, action) => action.payload);
});

export const userStore = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});
