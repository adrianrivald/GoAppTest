import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetNameAndLogo } from '../api/GetNameAndLogo'
import { GetProduct } from '../api/GetProduct'
import { PostLogin } from '../api/PostLogin'
import ProductCard from '../components/atom/productCard/ProductCard'
import SliderGallery from '../components/atom/slider/SliderGallery'
import Header from '../components/molecules/header/Header'
import LoginModal from '../components/molecules/loginModal/Login'
import ProductList from '../components/molecules/productList/ProductList'
import { bannerData } from '../helpers/bannerDataList'
import { priceToRupiah } from '../helpers/priceToRupiah'
import { NameLogoModelType } from '../models/NameLogoModel'
import { ProductDetailModelType } from '../models/ProductModel'
import { StoreStateType } from '../store'
import styles from '../styles/Home.module.scss'
import Cookies from 'universal-cookie';
import { UserModelType } from '../models/UserModel'
import { PostAddToCart } from '../api/PostAddToCart'
import { LinesModelType } from '../models/CartModel'
import { addCartItem } from '../store/cart/action'
import { GetUserInfo } from '../api/GetUserInfo'
import { TokenModelType } from '../models/TokenModel'
import Popup from '../components/atom/popup/Popup'


const Home = ({
  nameLogo,
  token,
  productData
} :InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [ nameAndLogo ] = useState(nameLogo as NameLogoModelType)
  const [ productDataList ] = useState(productData as ProductDetailModelType[])
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isSearchTyped, setIsSearchTyped] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoginFirst, setIsLoginFirst] = useState(false)
  const [isAddToCart, setIsAddToCart] = useState(false)

  const [toggleLogin, setToggleLogin] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch();
  let resultToken = '';
  const cookies = new Cookies();
  const cookie_username: string = process.env.COOKIE_USERNAME!;
  const cookie_token: string = process.env.COOKIE_TOKEN!;
  const tokenLogin = cookies.get(cookie_token);
  const usernameLogin = cookies.get(cookie_username);
  const [loginInput, setLoginInput] = useState({} as UserModelType);
  const dateExpired = new Date();
  dateExpired.setFullYear(dateExpired.getFullYear() + 1);
  console.log(productDataList, 'apani')

  useEffect(()=>{
    getUserInfo();
    console.log(tokenLogin,usernameLogin,'apanitoken')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getUserInfo = () => {
    if(tokenLogin){
      GetUserInfo(token).then((result)=> {
        console.log(result, 'apaniuserinfo')
      })
    }
  }

  const onChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setSearch(value)
    if (value.length > 0){
      setIsSearchTyped(true)
    } else {
      setIsSearchTyped(false)
    }
  }

  const onFocus = (e:any) => {
    setIsSearch(true)
  }

  const showLogin = () => {
    setToggleLogin(!toggleLogin)
    setIsLoginFirst(false)
  }

  const imageStyle = {
    width: '30px',
    cursor: 'pointer'
  }

  const clickImage = () => {
    setIsSearch(!isSearch);
    setSearch('')
    router
  }

  const goToCart =() => {
    if(tokenLogin) {
      router.push('/cart')
    } else {
      setIsLoginFirst(true)
      setToggleLogin(!toggleLogin)
    }
  }

  const addToCart = (uid: number, quantity: number) => {
    // const items = productDataList.map((item) => Object.assign({}, item));
    // items[i].count = Number(counter);
    // const { uid, original_price } = productDataList[i];
    // const orderPriceConverted = original_price.price.toString()
    // setOrderCounter(orderCounter + counter);
    // setOrderPrice(parseInt(orderPriceConverted) + orderPrice);
    // dispatch(addProductQuantity(orderCounter));
    // dispatch(addProductPrice(parseInt(orderPriceConverted)));
    // console.log(parseInt(orderPriceConverted), orderCounter, orderPrice, 'apaniiiredux')
    if(tokenLogin) {
      PostAddToCart(uid, quantity + 1, token, tokenLogin).then((result)=> {
        setIsAddToCart(true)
          setTimeout(() => {
            setIsAddToCart(false)
          }, 5000);
        console.log(result, 'apaniaddtocart')
      })
    } else {
      setIsLoginFirst(true)
      setToggleLogin(!toggleLogin)
    }
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    const { value, name } = e.target;
    setLoginInput((multipleInput) => ({ ...multipleInput, [name]: value }));
    console.log(value, 'apanilogin')
  };

  const loginHandler = () => {
   
      PostLogin(loginInput, token).then((result) => {
        if(result){
          alert('Login Sukses!')
          resultToken = result.token;
          console.log(result.token, 'apanitoken')
          setIsError(false)
          window.location.href = '/'
        } else {
          setIsError(true)
        }
        console.log(result, 'apaniresultlogin')
      }).catch((e)=>{
        console.log(e,'error')
        }).finally(()=>{
          cookies.set(cookie_token, resultToken, {
            path: '/',
            expires: dateExpired
          });
      })

  }

  const logoutHandler = () => {
      // Auth.removeSession();
      cookies.remove(cookie_token);
      cookies.remove(cookie_username);
      router.reload()
  }
//   const cartModal = () => {
//     return (
//         <div className={`cart-modal ${toggleCart ? 'show' : ''}`}>
//             {/* <div className="background" onClick={popupHandler}></div> */}
//             <div className="popup-box">
//                 <div className="popup-box-top">
//                     <div className="popup-box-title">
//                     <span className="title">{amount} Items | {priceToRupiah(price)}</span> <br />
//                     <span className="subtitle">Termasuk ongkos kirim</span>
//                     </div>
//                     <div onClick={popupHandler} className='popup-close'>
//                         <FontAwesomeIcon icon={faShoppingCart} style={{marginRight: '10px'}}/>
//                         <FontAwesomeIcon icon={faChevronRight} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

  return (
    <div className={`${styles['container']}`}>
      {
        !isSearch ? 
          <>
            <SliderGallery bannerData={bannerData} />
            <div className={`${styles['main']}`}>

              <ProductList
                productData={productDataList}
                value='Produk Terlaris'
                addToCart={addToCart}
              />
            </div>
          </>
         : 
          <div className={`${styles[`main`]} ${isSearch && isSearchTyped ? styles['search-on'] : styles['']}`}>
              {
                isSearchTyped ? 
                <h1>Hasil pencarian untuk : {search}</h1> : null
              }
              <div className={`${styles['product-list']}`} >              
                <div className={`${styles['product-card']}`} >              
              { isSearchTyped ?
                      productDataList
                      // eslint-disable-next-line
                      .filter(item => {
                          if (!search) return true
                          if (item.name.toLowerCase().includes(search)) {
                              return true
                      }
                      })
                      .map((result, i) => (
                            <div className={`${styles['product-card-list']}`} >              
                              <div className={`${styles['product-image']}`} key={result.uid}>
                                  <img src={result.primary_image_url} />
                              </div>
                              <div className={`${styles['product-main']}`}>
                                  <h1>{result.name}</h1>
                                  <div className={`${styles['product-price']}`}>{priceToRupiah(result.original_price.price)}</div> 
                                  <div className={`${styles['product-sold']}`}>Terjual | {result.total_sold}</div>  
                              </div>
                              <div className={`${styles['add-to-cart']}`}>
                                  <button className={`${styles['button']}`} onClick={() =>addToCart(result.uid, 1)}>
                                      <FontAwesomeIcon icon={faPlus} style={{width: '20px'}}/>
                                      <span className={`${styles['text']}`}>Add to cart</span>
                                  </button>    
                              </div>
                            </div>
                      ))
                      : null
                    }
                </div>
              </div>
            </div>
      }

        {/* Floating header */}
        <Header
          value={search} 
          logoImage={nameAndLogo.logo.image_url} 
          cartImage="https://icons.iconarchive.com/icons/iconsmind/outline/512/Shopping-Cart-icon.png"
          loginImage="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          onChange={onChange} 
          name="search_query" 
          onFocus={onFocus}
          style={isSearch ? imageStyle : null}
          clickImage={isSearch ? clickImage : () => router.push('/')}
          toggleLogin={showLogin}
          goToCart={goToCart}
          isSearch={isSearch}
        />

        {/* Login Modal */}
        <LoginModal
          popupHandler={showLogin}
          action={toggleLogin}
          loginHandler={loginHandler}
          email={loginInput.username}
          otpCode={loginInput.otp_code}
          handleChange={handleChange}
          isLoggedIn={tokenLogin}
          logoutHandler={logoutHandler}
          isError={isError}
          isLoginFirst={isLoginFirst}
        />

        {/* Popup AddtoCart */}
        {
          isAddToCart ?
            <Popup
              value="Success add to cart"
              icon="https://lh3.googleusercontent.com/proxy/S2cE_uwPmIwKE_bBxIF54C_21HHjMhe18AIwWJhNP6AAd6m9R6NSC8QFEmNR7gei4zNdwYNulcA5Sgyt6anwBqqRAPUT-rR7HtiT6uAXimnqLB6-VeM2RYV2Ua4bitWqNA"
            /> : null
        }
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const token: number = Number(process.env.API_KEY);
  const nameLogo: NameLogoModelType = await GetNameAndLogo(token);
  const productData: ProductDetailModelType[] = await GetProduct(token,'');

  return {
    props: {
      token: token || process.env.api_key,
      nameLogo: nameLogo || ({} as NameLogoModelType),
      productData: productData || ([] as ProductDetailModelType[]),
    },
  };
};

export default Home