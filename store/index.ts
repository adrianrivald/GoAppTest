import { applyMiddleware, combineReducers, createStore } from 'redux';
//import { searchResultReducer } from './search/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import { useMemo } from 'react';
import { CartStateType } from './cart/type';
import { productReducer } from './cart/reducer';
let store;
const persistConfig = {
  key: 'root',
  storage,
};

const exampleInitialState = {
};

export interface StoreStateType {
  cart: CartStateType;
}

const rootReducer = combineReducers({
  product: productReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

// if (process.env.NODE_ENV === 'development') {
//   const { logger } = require(`redux-logger`);
//   middlewares.push(logger);
// }

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default function Store() {
//   //   const enhancer = compose(applyMiddleware(...middlewares));
//   const store = createStore(persistedReducer);
//   console.log(store.getState());
//   // @ts-ignore
//   const persistor = persistStore(store);
//   return { store, persistor };
// }

function makeStore(initialState = exampleInitialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}
export const initializeStore = (preloadedState) => {
  //@ts-ignore
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    console.log(...store.getState());
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
