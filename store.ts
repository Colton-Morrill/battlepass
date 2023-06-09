import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import themeReducer from './slices/themeSlice';
import productsSlice from './slices/productSlice';
import battlePointsSlice from './slices/battlePointsSlice';
import userTypeSlice from './slices/userTypeSlice';

import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist"
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig =  {
    key:  'root',
    version: 1,
    storage
};

const reducer = combineReducers({
    theme: themeReducer,
    productsSlice: productsSlice.reducer,
    points: battlePointsSlice,
    userType: userTypeSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch