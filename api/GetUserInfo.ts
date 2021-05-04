import axios from 'axios';

export const GetUserInfo = async (
    token : number,
) => {

  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
};

  const result: any = await axios
    .post(
      `https://account.dev.goapp.co.id/auth/token-info/`, 
      {
          token_data: {
              token: token
          }
      },
    )
    .then(({ data }) => {
      console.log('Datatatat', data);
      return data;
    })
    .catch((error) => {
        console.log(error,'error')
    });
  return result;
};
