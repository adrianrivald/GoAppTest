import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/dist/client/router';
import React, { CSSProperties } from 'react';
import Cookies from 'universal-cookie';
import { UserInfoModelType } from '../../../models/UserModel';
import SearchBar from '../../atom/searchBar/SearchBar';
import styles from './Header.module.scss';

interface HeaderProps {
  logoImage: string;
  cartImage: string;
  loginImage: string;
  userImage: string;
  value: string;
  onChange: (e: any) => void;
  onFocus: (e: any) => void;
  clickImage: (e: any) => void;
  name: string;
  style?: CSSProperties;
  toggleLogin: (e: any) => void;
  toggleUserInfo: (e: any) => void;
  goToCart: (e: any) => void;
  isSearch: boolean;
  isLoggedin: {};
  userInfo: UserInfoModelType | {};
}

const Header = (Props: HeaderProps) => {
  const {
    logoImage,
    cartImage,
    loginImage,
    value,
    onChange,
    onFocus,
    name,
    style,
    clickImage,
    toggleLogin,
    goToCart,
    isSearch,
    isLoggedin,
    toggleUserInfo,
    userImage,
    userInfo
  } = Props;
  const router = useRouter();
  
  const cookies = new Cookies();
  const cookie_token: string = process.env.COOKIE_TOKEN!;
  const cookie_username: string = process.env.COOKIE_USERNAME!;
  const tokenLogin = cookies.get(cookie_token);
  const tokenUsername = cookies.get(cookie_username)
 
  return (
    <div className={`${styles['header']}`}>
        <div className={`${styles['header-content']}`}>
            <div className={`${styles['logo']}`} onClick={clickImage}>
              {
                isSearch ? 
                <FontAwesomeIcon icon={faArrowLeft} style={{color: '#0e4d71', fontSize: '30px'}} />
                :
                <img src={logoImage} style={style} />
              }
              </div>
            <SearchBar placeholder="Cari di GoFit Apparel" onFocus={onFocus} value={value} name={name} onChange={onChange}/>
            <div className={`${styles['icon']}`}>
              <div className={`${styles['cart']}`}>
                  <img src={cartImage} onClick={goToCart}/>
              </div>
              <div className={`${styles['login']}`}>
                  <img 
                    src={cookies.get(cookie_token) ? userImage : loginImage}  
                    onClick={cookies.get(cookie_token) ? toggleUserInfo : toggleLogin}/>
              </div>
            </div>
        </div>
    </div>
  );
};

export default Header;
