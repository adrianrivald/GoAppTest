import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Router, useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Request.module.scss'
import Cookies from 'universal-cookie';
import MaterialTextField from '../../components/atom/materialTextInput/MaterialTextInput'
import { PostRequestLogin } from '../../api/PostRequestLogin'
// import Auth from '../../auth/Auth'
import { AuthModelType } from '../../models/UserModel'


const Request = ({
token
} :InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [ request, setRequest] = useState({} as AuthModelType)
    const router = useRouter();
  useEffect(()=>{
    // Auth.checkSession('/', false);

  },[])

  const usernameHandleChange = (e: any) => {
    e.preventDefault();
    const { value, name } = e.target;
    setRequest((multipleInput) => ({ ...multipleInput, [name]: value }));
    console.log(request, 'apanireq')
  };

  const requestOtp = () => {
      PostRequestLogin(request, token).then((result)=> {
          console.log(result,'apanirequ')
          if(result.status === 'sent'){
              alert('OTP Requested, check your email')
              router.push('/')
          }
      }).catch((e)=>{
        console.log(e,'error')
      })
  }

  return (
    <div className={`${styles['request']}`}>
        <MaterialTextField
            label="Email"
            placeholder="Masukkan email Anda"
            name="address"
            value={request.address}
            onChange={usernameHandleChange}
        />
        <button className={`${styles['submit']}`} onClick={requestOtp}>
            Submit
        </button>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async () => {
  const token: number = Number(process.env.API_KEY);
  
    return {
      props: {
        token: token || process.env.API_KEY,
      },
    };
  };


export default Request