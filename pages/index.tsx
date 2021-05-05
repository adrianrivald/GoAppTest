import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { GetNameAndLogo } from '../api/GetNameAndLogo'
import { GetProduct } from '../api/GetProduct'
import { PostLogin } from '../api/PostLogin'
import SliderGallery from '../components/atom/slider/SliderGallery'
import Header from '../components/molecules/header/Header'
import LoginModal from '../components/molecules/loginModal/Login'
import ProductList from '../components/molecules/productList/ProductList'
import { bannerData } from '../helpers/bannerDataList'
import { priceToRupiah } from '../helpers/priceToRupiah'
import { NameLogoModelType } from '../models/NameLogoModel'
import { ProductDetailModelType } from '../models/ProductModel'
import styles from '../styles/Home.module.scss'
import Cookies from 'universal-cookie';
import { UserInfoModelType, UserModelType } from '../models/UserModel'
import { PostAddToCart } from '../api/PostAddToCart'
import { GetUserInfo } from '../api/GetUserInfo'
import Popup from '../components/atom/popup/Popup'
import { ProductListMoreProps, productListMore } from '../helpers/productListData'


const Home = ({
  nameLogo,
  token,
  productData
} :InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [ nameAndLogo ] = useState(nameLogo as NameLogoModelType)
  const [ productDataList ] = useState(productData as ProductDetailModelType[])
  const [productMore, setProductMore] = useState([] as ProductListMoreProps[])
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isSearchTyped, setIsSearchTyped] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoginFirst, setIsLoginFirst] = useState(false)
  const [isAddToCart, setIsAddToCart] = useState(false)
  const [toggleCart, setToggleCart] = useState(false)
  const [toggleLogin, setToggleLogin] = useState(false)
  const router = useRouter();
  let resultToken = '';
  const cookies = new Cookies();
  const cookie_token: string = process.env.COOKIE_TOKEN!;
  const tokenLogin = cookies.get(cookie_token);
  const [loginInput, setLoginInput] = useState({} as UserModelType);
  const dateExpired = new Date();
  dateExpired.setFullYear(dateExpired.getFullYear() + 1);
  //counter
  const [orderCounter, setOrderCounter] = useState(0);
  const [productUid, setProductUid] = useState(0);
  const [userInfo, setUserInfo] = useState({} as UserInfoModelType);


  useEffect(()=>{
    setProductMore(productListMore)
    getUserInfo();
    window.scroll(0,0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getUserInfo = () => {
    if(tokenLogin){
      GetUserInfo(tokenLogin).then((result)=> {
        setUserInfo(result)
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
    setTimeout(() => {
      setIsLoginFirst(false)
    }, 500);
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
    if(tokenLogin) {
      PostAddToCart(uid, quantity, token, tokenLogin).then((result)=> {
          setToggleCart(false)
          setIsAddToCart(true)
          setTimeout(() => {
            setIsAddToCart(false)
          }, 5000);
      })
    } else {
      setIsLoginFirst(true)
      setToggleLogin(!toggleLogin)
    }
  }

  const increase = () => {
    setOrderCounter(orderCounter + 1);
  };

  const decrease = () => {
    setOrderCounter(orderCounter - 1);
  };

  const cartChange = (count: number) => {
    setOrderCounter(count);

  }

  const cartToggle = (uid: number) => {
    if(tokenLogin){
      setToggleCart(!toggleCart)
      setProductUid(uid)
    } else {
      setIsLoginFirst(true)
      setToggleLogin(!toggleLogin)
    }
  }

  const cartModal = (uid: number) => {
    return (
        <div className={`${styles['cart-modal']} ${toggleCart ? styles['show'] : styles['']}`}>
            <div className={`${styles['background-cart-modal']}`} onClick={() => setToggleCart(!toggleCart)}></div>
            <div className={`${styles['popup-box']}`}>
                <div className={`${styles['popup-box-top']}`}>
                    <div className={`${styles['popup-box-title']}`}>
                      <span className={`${styles['title']}`}>Quantity</span>
                      <FontAwesomeIcon icon={faTimes} style={{fontSize: '12px',color: 'white',cursor: 'pointer'}} onClick={() => setToggleCart(false)}/>
                    </div>
                    <div className={`${styles['amount-count']} 'left'`}>
                      <span
                        className={`${styles['button']} ${styles['decrease']}`}
                        onClick={decrease}
                      >
                        -
                      </span>
                      <input
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        className={`${styles['total']}`}
                        value={orderCounter}
                        onChange={() => cartChange(orderCounter)}
                      />
                      <span
                        className={`${styles['button']} ${styles['increment']}`}
                        onClick={increase}
                      >
                        +
                      </span>
                    </div>
                    <div className={`${styles['add-to-cart']}`}>
                        <button className={`${styles['button']}`} onClick={() =>addToCart(uid, orderCounter)}>
                            <FontAwesomeIcon icon={faPlus} style={{width: '20px'}}/>
                            <span className={`${styles['text']}`}>Add to cart</span>
                        </button>    
                    </div>
                </div>
            </div>
        </div>
    )
}

  const handleChange = (e: any) => {
    e.preventDefault();
    const { value, name } = e.target;
    setLoginInput((multipleInput) => ({ ...multipleInput, [name]: value }));
  };

  const loginHandler = () => {
   
      PostLogin(loginInput, token).then((result) => {
        if(result){
          alert('Login Sukses!')
          resultToken = result.token;
          setIsError(false)
          window.location.href = '/'
        } else {
          setIsError(true)
        }
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
      cookies.remove(cookie_token);
      router.reload()
  }

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
                addToCart={cartToggle}
                orderCounter={orderCounter}
              />
              {/* <div className={`${styles['product-list-more']}`}>
                <div className={`${styles['product-list-more-title']}`}>
                  <h1>Produk lainnya</h1>
                </div>
                {
                  productMore.map((result) => {
                    return (
                      <div className={`${styles['product-list-more-item']}`}>
                        <span className={`${styles['title']}`}>
                          {result.product_name}
                        </span>
                      </div>
                    )
                  })
                }
              </div> */}
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
                                  <button className={`${styles['button']}`} onClick={()=> cartToggle(result.uid)}>
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
          account_email={userInfo.email}
          account_name={userInfo.username}
          business_name={userInfo.business_name}
        />

        {/* Popup AddtoCart */}
        {
          isAddToCart ?
            <Popup
              value="Success add to cart"
              icon="https://lh3.googleusercontent.com/proxy/S2cE_uwPmIwKE_bBxIF54C_21HHjMhe18AIwWJhNP6AAd6m9R6NSC8QFEmNR7gei4zNdwYNulcA5Sgyt6anwBqqRAPUT-rR7HtiT6uAXimnqLB6-VeM2RYV2Ua4bitWqNA"
            /> : null
        }
        {
          cartModal(productUid) 
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
      token: token || process.env.API_KEY,
      nameLogo: nameLogo || ({} as NameLogoModelType),
      productData: productData || ([] as ProductDetailModelType[]),
    },
  };
};

export default Home