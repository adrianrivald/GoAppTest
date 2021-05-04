import { LinesModelType } from '../../models/CartModel';
import {
  ADD_CART_DATA
} from './type';

export function addCartItem(data: LinesModelType) {
  return {
    type: ADD_CART_DATA,
    payload: data,
  };
}
