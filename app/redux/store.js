// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import { combineReducers } from 'redux';
// import idbStorage from '../idb/Storage';
// import storage from 'redux-persist-indexeddb-storage';
// import coachReducer from './reducers/coachReducer';
// import stadiumReducer from './reducers/stadiumReducer';

// // Coaches persist configuration
// const coachesPersistConfig = {
//   key: 'coaches',
//   storage: idbStorage
// };

// // Stadiums persist configuration
// // const stadiumsPersistConfig = {
// //   key: 'stadiums',
// //   storage: idbStorage,
// // };

// // Persisted reducers
// const rootReducer = combineReducers({
//   coaches: persistReducer(coachesPersistConfig, coachReducer),
// //   stadiums: persistReducer(stadiumsPersistConfig, stadiumReducer),
// });

// // Configure Store
// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);
// export default store;
