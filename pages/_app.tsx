import '../styles/globals.scss';
import type { AppProps /*, AppContext */ } from 'next/app';
import { useStore } from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import { SkeletonTheme } from 'react-loading-skeleton';

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
  }

  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SkeletonTheme color='#a6a6a6' highlightColor='#ffffff'>
          <Component {...pageProps} />
        </SkeletonTheme>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
