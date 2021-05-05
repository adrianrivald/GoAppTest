import React, { CSSProperties } from 'react';
import { ProductDetailModelType, ProductModelType } from '../../../models/ProductModel';
import ProductCard from '../../atom/productCard/ProductCard';
import styles from './ProductList.module.scss';

interface ProductCardProps {
  productData: ProductDetailModelType[];
  value?: string;
  orderCounter: number;
  addToCart: (uid: number, quantity: number) => void;
}

const ProductList = (Props: ProductCardProps) => {
  const {
   productData,
   value,
   addToCart,
   orderCounter
  } = Props;
  
 
  return (
    <div className={`${styles['product-list']}`} >    
        <div className={`${styles['product-section-title']}`} >
            <h1>{value}</h1>
        </div>
        <ProductCard productData={productData} addToCart={addToCart} orderCounter={orderCounter}/>
    </div>
  );
};

export default ProductList;
