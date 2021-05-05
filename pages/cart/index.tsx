import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Router, useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { GetCart } from '../../api/GetCart'
import { GetNameAndLogo } from '../../api/GetNameAndLogo'
import HeaderCart from '../../components/molecules/header/HeaderCart'
import { CartModelType, LinesModelType } from '../../models/CartModel'
import { NameLogoModelType } from '../../models/NameLogoModel'
import styles from './Cart.module.scss'

const product1 = 'https://media.dev.goapp.co.id/45114758593096/image/catalog/product/66400602007112.jpeg';
const product2 = 'https://media.dev.goapp.co.id/45114758593096/image/catalog/product/66419555921992.jpg'
const product3 = 'https://media.dev.goapp.co.id/45114758593096/image/catalog/product/66419555921992.jpg'

const Cart = ({
   token,
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
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const imagePicker = (uid: number) => {
      switch (uid) {
        case 45132716338248:
          return product1
        case 66396123755080:
          return product2
        case 66420830665288:
          return product3
        default:
          break;
      }
    }
    
    const productNamePicker = (uid: number) => {
        switch (uid) {
          case 45132716338248:
            return 'Gofit Premium Cotton 8600 Royal Blue'
          case 66396123755080:
            return 'Coffee Cup'
          case 66420830665288:
            return 'Kopi Eka Vian'
          default:
            break;
        }
    }
    return (
        <div className={`${styles['cart']}`}>
            <div className={`${styles['cart-item']}`}>
              {
                cartItem.map((result)=> {
                  return (
                    <div className={`${styles['cart-list-item']}`}>
                      <h1>UID Product : {result.product.uid}</h1>
                      <div className={`${styles['middle']}`}>
                        <img src={imagePicker(result.product.uid)}/>
                        <div className={`${styles['product-section']}`}>
                          <span className={`${styles['product-name']}`}>
                            {productNamePicker(result.product.uid)}
                          </span>
                          <p>Quantity : {result.quantity}</p>
                        </div>
                      </div>
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
  
    return {
      props: {
        token: token || process.env.api_key,
      },
    };
  };

export default Cart