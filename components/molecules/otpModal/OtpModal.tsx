import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './OtpModal.module.scss';
import MaterialTextField from '../../atom/materialTextInput/MaterialTextInput';
import FontAwesome from 'react-fontawesome';
import { faCross, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { PostRequestLogin } from '../../../api/PostRequestLogin';


interface OtpModalProps {
    popupHandler: (e:any) => void;
    handleChange: (e:any) => void;
    loginHandler: (e:any) => void;
    logoutHandler: (e:any) => void;
    action: boolean;
    isError: boolean;
    isLoginFirst: boolean;
    isLoggedIn: string;
    email: string;
    otpCode: string;
    // account_name: string;
    // business_name: string;
    // account_email: string;
    isOTPRequested: boolean;
    requestOtp: () => void;
    usernameHandleChange: (e: any) => void;
    requestEmail: string;
    maxLength: number
  }

const OtpModal: FC<OtpModalProps> = (props) => {
    const { 
        action, 
        isError, 
        popupHandler, 
        handleChange, 
        loginHandler, 
        logoutHandler, 
        isLoggedIn, 
        email, 
        otpCode, 
        isLoginFirst,
        // account_email,
        // account_name,
        // business_name,
        isOTPRequested,
        requestOtp,
        usernameHandleChange,
        requestEmail,
        maxLength
    } = props;
  
    return (
    <div className={`${styles[`login-modal`]} ${action ? styles['show'] : styles['']}`}>
        <div className={`${styles['background']}`} onClick={popupHandler}></div>
        <div className={`${styles['login-box']}`}>
            <div className={`${styles['top']}`}>
                <FontAwesomeIcon icon={faTimes} style={{cursor: 'pointer'}} onClick={popupHandler}/>
            </div>
            <div className={`${styles['title']}`}>
                <h1>Login</h1>
            </div>
            <div className={`${styles['input']}`}>
                <MaterialTextField
                    value={otpCode}
                    label="OTP Code"
                    onChange={handleChange}
                    name="otp_code"
                    maxLength={maxLength}
                    style={{justifyContent: 'center'}}
                /> 
                {
                    isError ?
                    <div className={`${styles['error']}`}>
                        OTP Salah
                    </div> : null
                }
            </div> 
            <div className={`${styles['submit']}`}>
                <button className={`${styles['button']}`} onClick={loginHandler}>Submit</button>
            </div>
            <div className={`${styles['otp-request']}`}>
                <span className={`${styles['text']}`}>
                    Belum punya otp? Request dengan klik 
                    <Link href="/request">
                        <span className={`${styles['link']}`}> disini</span>
                    </Link>
                </span>
            </div>
        </div>
    </div>
  );
};

export default OtpModal;
