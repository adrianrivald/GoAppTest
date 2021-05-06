import '../styles/globals.scss';
import type { AppProps /*, AppContext */ } from 'next/app';
import { useStore } from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import { SkeletonTheme } from 'react-loading-skeleton';
import React, { useEffect, useState } from 'react';
import UserContext from '../context/UserContext'
import { UserInfoModelType } from '../models/UserModel';
import Cookies from 'universal-cookie';
import { GetUserInfo } from '../api/GetUserInfo';

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
  }

  const [userInfo, setUserInfo] = useState({} as UserInfoModelType);
  const cookies = new Cookies();
  const cookie_token: string = process.env.COOKIE_TOKEN!;
  const tokenLogin = cookies.get(cookie_token);

  useEffect(()=> {
    getUserInfo();
    console.log(userInfo,'userinfoapp')
  },[])

  const getUserInfo = () => {
    if(tokenLogin){
      GetUserInfo(tokenLogin).then((result)=> {
        setUserInfo(result)
      })
    }
  }
  return (
    <UserContext.Provider 
      value={userInfo}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
