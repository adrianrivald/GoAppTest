import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/dist/client/router';
import React, { CSSProperties } from 'react';
import FontAwesome from 'react-fontawesome';
import SearchBar from '../../atom/searchBar/SearchBar';
import styles from './HeaderCart.module.scss';

interface HeaderProps {
  clickImage: (e:any) => void;
}

const Header = (Props: HeaderProps) => {
  const {
    clickImage
  } = Props;
  const router = useRouter();
  
 
  return (
    <div className={`${styles['header']}`}>
        <div className={`${styles['header-content']}`}>
            <div className={`${styles['back']}`} onClick={clickImage}>
                <FontAwesomeIcon icon={faArrowLeft} style={{color: '#0e4d71', fontSize: '30px'}} />
            </div>
            <div className={`${styles['title']}`}>
              <span className={`${styles['title-header']}`}>
                  Cart
              </span>
            </div>
        </div>
    </div>
  );
};

export default Header;
