import React, { CSSProperties } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  onFocus: (e: any) => void;
  styles?: CSSProperties;
}

const SearchBar = (Props: SearchBarProps) => {
  const {
    placeholder,
    name,
    value,
    onChange,
    onFocus
  } = Props;
  
 
  return (
    <div className={`${styles['search-bar']}`} >
      <div className={`${styles['input-area']}`}>
        <input
            type="text"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
          />
          <img src="http://cdn.onlinewebfonts.com/svg/img_80367.png" style={{width: '20px', height: '20px',cursor: 'pointer'}}/>
      </div>
    </div>
  );
};

export default SearchBar;
