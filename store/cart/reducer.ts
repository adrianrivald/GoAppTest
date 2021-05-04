import { LinesModelType } from '../../models/CartModel';
import { ProductModelType } from '../../models/ProductModel';
import { CartActionTypes, CartStateType } from './type';


export const cartInitialState: CartStateType = {
  cartData: {} as LinesModelType
};

export function productReducer(
  state = cartInitialState,
  action: CartActionTypes
) {
  switch (action.type) {
    case 'ADD_CART_DATA':
      return {
        ...state,
        carData: action.payload,
      };
    default:
      return state;
  }
}
