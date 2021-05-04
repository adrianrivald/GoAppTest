import axios from 'axios';
import { UserModelType } from '../models/UserModel';

export const PostLogin = async (
  data: UserModelType,
  token: number
) => {

axios.defaults.headers.common = {
"X-API-Key": token,
'Content-Type': 'application/json',

};

const result: any = await axios
    .post(
      `https://account.dev.goapp.co.id/auth/token-auth/`,
        {
          username: data.username,
          otp_code: data.otp_code,
        },
    )
    .then(({ data }) => {
      console.log('data', data);
      return data;
    })
    .catch((error) =>{
    });
  return result;
};
