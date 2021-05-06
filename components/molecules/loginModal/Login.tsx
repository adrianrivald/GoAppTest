import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Login.module.scss';
import MaterialTextField from '../../atom/materialTextInput/MaterialTextInput';
import FontAwesome from 'react-fontawesome';
import { faCross, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { PostRequestLogin } from '../../../api/PostRequestLogin';
import { OtpDetailModelType, OtpModelType } from '../../../models/OtpModel';


interface AddressModalProps {
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
    maxLength: number;
    otpInput: string
    otpValues: OtpDetailModelType[]
  }

const LoginModal: FC<AddressModalProps> = (props) => {
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
        maxLength,
        otpValues,
        otpInput
    } = props;
  
    return (
    <div className={`${styles[`login-modal`]} ${action ? styles['show'] : styles['']}`}>
        <div className={`${styles['background']}`} onClick={popupHandler}></div>
        <div className={`${styles['login-box']}`}>
            <div className={`${styles['top']}`}>
                <FontAwesomeIcon icon={faTimes} style={{cursor: 'pointer'}} onClick={popupHandler}/>
            </div>
            {
                isLoginFirst ? 
                <div className={`${styles['login-first']}`}>
                    Login terlebih dahulu
                </div> :
                null
            }
           
            {/* <div className={`${styles['logged-in']}`}> 
                <div className={`${styles['user-info']}`}>
                    <h1>Hi, {account_name}</h1>
                    <div className={`${styles['user-detail']}`}>
                        <span className={`${styles['business']}`}>
                            Company : {business_name}
                        </span>
                        <span className={`${styles['email']}`}>
                            Email : {account_email}
                        </span>
                    </div>
                </div>
                <div className={`${styles['submit']}`}>
                    <button className={`${styles['button']}`} onClick={logoutHandler}>
                        Logout
                    </button>
                </div>
            </div>  */}
            {
            isOTPRequested ? 
            <>
            <div className={`${styles['title']}`}>
                <h1>Login</h1>
            </div>
            <div className={`${styles['input']}`}>
                {/* <MaterialTextField
                    value={email}
                    placeholder="Masukkan alamat email"
                    label="Alamat Email"
                    onChange={handleChange}
                    name="username"
                /> */}
                
                            <input
                                value={otpInput}
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
            </> : 
            <> 
            <div className={`${styles['request']}`}>
                <MaterialTextField
                    label="Email"
                    placeholder="Masukkan email Anda"
                    name="address"
                    value={requestEmail}
                    onChange={usernameHandleChange}
                />
                <button className={`${styles['submit']}`} onClick={requestOtp}>
                    Submit
                </button>
            </div>
            </>
            }
        </div>
    </div>
  );
};

export default LoginModal;
