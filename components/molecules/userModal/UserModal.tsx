import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './UserModal.module.scss';
import MaterialTextField from '../../atom/materialTextInput/MaterialTextInput';
import FontAwesome from 'react-fontawesome';
import { faCross, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { PostRequestLogin } from '../../../api/PostRequestLogin';


interface UserModalProps {
    popupHandler: (e:any) => void;
    logoutHandler: (e:any) => void;
    action: boolean;
    isError: boolean;
    isLoginFirst: boolean;
    isLoggedIn: string;
 
    account_name: string;
    business_name: string;
    account_email: string;
  }

const UserModal: FC<UserModalProps> = (props) => {
    const { 
        action, 
        isError, 
        popupHandler, 
        logoutHandler, 
        account_email,
        account_name,
        business_name,
        isLoggedIn
    } = props;
  
    return (
    <div className={`${styles[`user-modal`]} ${action ? styles['show'] : styles['']}`}>
        <div className={`${styles['background']}`} onClick={popupHandler}></div>
        <div className={`${styles['login-box']}`}>
            <div className={`${styles['top']}`}>
                <FontAwesomeIcon icon={faTimes} style={{cursor: 'pointer'}} onClick={popupHandler}/>
            </div>
            <div className={`${styles['logged-in']}`}> 
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
            </div> 
        </div>
    </div>
  );
};

export default UserModal;
