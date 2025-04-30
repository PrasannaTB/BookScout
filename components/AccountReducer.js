import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

// Action
export const setUserInfo = createAction('user/set');

// Reducer
const userInfoReducer = createReducer(null, (builder) => {
  builder.addCase(setUserInfo, (state, action) => action.payload);
});

// Store
export const userStore = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});
