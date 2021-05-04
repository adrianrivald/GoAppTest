import { LinesModelType } from '../../models/CartModel';

export interface CartStateType {
  cartData: LinesModelType
}

export const ADD_CART_DATA= 'ADD_CART_DATA';

interface AddCartDataAction {
  type: typeof ADD_CART_DATA;
  payload: LinesModelType;
}
export type CartActionTypes =
  | AddCartDataAction;
