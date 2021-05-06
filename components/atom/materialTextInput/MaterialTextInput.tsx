import React, { CSSProperties } from 'react';
import styles from './MaterialTextInput.module.scss';

interface MaterialTextFieldProps {
  label: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  style?: CSSProperties;
  rightIcon?: 'calendar' | 'arrow';
  dropDownItems?: { value: any; label: string }[];
  maxLength?: number;
}

const MaterialTextField = (Props: MaterialTextFieldProps) => {
  const {
    label,
    placeholder,
    style,
    name,
    value,
    onChange,
    maxLength
  } = Props;
 
  return (
    <div className={`${styles['material-text-field']}`} style={style}>
      <span className={`${styles['label']}`}>{label}</span>
      <div className={`${styles['input-area']}`} style={style}>
        <input
            type="text"
            maxLength={maxLength}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
      </div>
      <div className={`${styles['line']}`} />
      <div className= {`${styles['info']}`}/>
    </div>
  );
};

export default MaterialTextField;
