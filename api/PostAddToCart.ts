import axios from 'axios';
import { CartModelType, LinesModelType } from '../models/CartModel';
import { UserModelType } from '../models/UserModel';

export const PostAddToCart = async (
  uid: number,
  quantity: number,
  token: number,
  tokenLogin: number
) => {

    axios.defaults.headers.common = {
        "X-API-Key": token,
        'Content-Type': 'application/json',
    };
    
      const config = {
        headers: {
          Authorization: `jwt ${tokenLogin}`,
        },
      };

const result: any = await axios
    .put(
      `https://api.dev.goapp.co.id/v1/sales/api/cart/0/`, 
        {
          lines : [
            {
              product: { 
                  uid: uid 
            },
              quantity: quantity
            }
          ]
        },
        config
    )
    .then(({ data }) => {
      console.log('data', data);
      return data;
    })
    .catch((error) =>{
    });
  return result;
};
