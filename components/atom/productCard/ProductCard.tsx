import React, { CSSProperties } from 'react';
import { priceToRupiah } from '../../../helpers/priceToRupiah';
import { ProductDetailModelType, ProductModelType } from '../../../models/ProductModel';
import styles from './ProductCard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FontAwesome from 'react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface ProductCardProps {
  productData: ProductDetailModelType[];
  addToCart: (uid: number, quantity: number) => void;
  orderCounter: number
}

const ProductCard = (Props: ProductCardProps) => {
  const {
   productData,
   addToCart,
   orderCounter
  } = Props;
  
 
  return (
    <div className={`${styles['product-card']}`} >
        {
            productData.map((result, i) => {
                return (
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
                            <button className={`${styles['button']}`} onClick={() =>addToCart(result.uid, orderCounter)}>
                                <FontAwesomeIcon icon={faPlus} style={{width: '20px'}}/>
                                <span className={`${styles['text']}`}>Add to cart</span>
                            </button>    
                        </div>
                    </div>
                )
            })
        }
    </div>
  );
};

export default ProductCard;
