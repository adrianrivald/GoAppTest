import axios from 'axios';
import { AuthModelType } from '../models/UserModel';

export const PostRequestLogin = async (
  data: AuthModelType,
  token: number
) => {

axios.defaults.headers.common = {
    "X-API-Key": token,
    'Content-Type': 'application/json',
    
    };

const result: any = await axios
    .post(
      `https://account.dev.goapp.co.id/auth/token-auth/otp/`,
        {
            address: data.address,
            method: 'email',
        },
    )
    .then(({ data }) => {
      console.log('data', data);
      return data;
    })
    .catch((error) =>{
      console.log(error,'error')
    });
  return result;
};
