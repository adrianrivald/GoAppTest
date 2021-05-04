import React, { CSSProperties } from 'react';
import styles from './MaterialTextInput.module.scss';

interface MaterialTextFieldProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  style?: CSSProperties;
  rightIcon?: 'calendar' | 'arrow';
  dropDownItems?: { value: any; label: string }[];
}

const MaterialTextField = (Props: MaterialTextFieldProps) => {
  const {
    label,
    placeholder,
    style,
    name,
    value,
    onChange,
  } = Props;
 
  return (
    <div className={`${styles['material-text-field']}`} style={style}>
      <span className={`${styles['label']}`}>{label}</span>
      <div className={`${styles['input-area']}`}>
        <input
            type="text"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
      </div>
      <div className={`${styles['line']}`} />
      <div className= {`${styles['info']}`}/>
    </div>
  );
};

export default MaterialTextField;
