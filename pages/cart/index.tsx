import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Router, useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { GetCart } from '../../api/GetCart'
import { GetNameAndLogo } from '../../api/GetNameAndLogo'
// import Auth from '../../auth/Auth'
import Header from '../../components/molecules/header/Header'
import HeaderCart from '../../components/molecules/header/HeaderCart'
import { CartModelType, LinesModelType } from '../../models/CartModel'
import { NameLogoModelType } from '../../models/NameLogoModel'
import { StoreStateType } from '../../store'
import styles from './Cart.module.scss'

const Cart = ({
   token,
   nameLogo
} :InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [cart, setCart] = useState({} as CartModelType)
  const [cartItem, setCartItem] = useState([] as LinesModelType[])
  const cookies = new Cookies();
  const cookie_username: string = process.env.COOKIE_USERNAME!;
  const cookie_token: string = process.env.COOKIE_TOKEN!;
  const tokenLogin = cookies.get(cookie_token);
  const usernameLogin = cookies.get(cookie_username);
  const router = useRouter();
  
    useEffect(()=>{
      if(tokenLogin || usernameLogin) {
        GetCart(token,tokenLogin).then((result)=> {
          setCart(result)
          setCartItem(result.lines)
          console.log(result,'apanicart')
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className={`${styles['cart']}`}>
            <div className={`${styles['cart-item']}`}>
              {
                cartItem.map((result)=> {
                  return (
                    <div className={`${styles['cart-list-item']}`}>
                      <h1>UID Product : {result.product.uid}</h1>
                      <p>Quantity : {result.quantity}</p>
                    </div>
                  )
                })
              }
            </div>

            <HeaderCart
              clickImage={() => router.back()}
            />
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
  const token: number = Number(process.env.API_KEY);
  const nameLogo: NameLogoModelType = await GetNameAndLogo(token);
  
    return {
      props: {
        token: token || process.env.api_key,
        nameLogo: nameLogo || ({} as NameLogoModelType),
      },
    };
  };

export default Cart