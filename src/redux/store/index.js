/* eslint-disable no-return-assign */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import searchReducer from './searchSlice';

const persistConfig = {
  key: 'root', // optional, if you have multiple reducers, use a unique key for each
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
